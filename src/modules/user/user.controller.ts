import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { User } from 'src/commons/decorators/request/user.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { AuthUser } from 'src/types';
import { PatchReferralDto } from './dtos/patch-referral.dto';
import { PatchUserNicknameDto } from './dtos/patch-user-nickname.dto';
import { UserService } from './user.service';
import { PaginationDto } from 'src/commons/dtos/pagination.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
@UseGuards(AuthGuard)
@ApiBearerAuth('accessToken')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/myInfo')
  async getMyInfo(@User() user: AuthUser) {
    return await this.userService.getUser(user.id);
  }

  @Get('/referral')
  async getReferral(@User() user: AuthUser, @Query() query: PaginationDto) {
    const { page, size } = query;
    return await this.userService.getUserReferral(user.id, page, size);
  }

  @Get('/myPoint')
  async getMyPoint(@User() user: AuthUser) {
    return await this.userService.getMyPoint(user.id);
  }

  @Get('quest-status')
  public async getUserQuestStatus(@User() user: AuthUser) {
    return await this.userService.getUserQuestStatus(user.id);
  }

  @Get('inventory')
  async getInventory(@User() user: AuthUser) {
    return await this.userService.getInventory(user.id);
  }

  @Patch('/patchReferral')
  @Throttle(1, 3)
  async patchReferral(
    @User() user: AuthUser,
    @Body() patchReferralDto: PatchReferralDto,
  ) {
    if (user.referralCode) {
      if (user.referralCode === patchReferralDto.referralCode) {
        throw new BadRequestException(
          'Cannot link with your own referral code',
        );
      }
    }

    return await this.userService.patchUserReference(
      user.id,
      patchReferralDto.referralCode,
    );
  }

  @Patch('/nickname')
  public async patchNickname(
    @User() user: AuthUser,
    @Body() patchUserNicknameDto: PatchUserNicknameDto,
  ) {
    return await this.userService.patchNickname(
      user.id,
      patchUserNicknameDto.nickname,
    );
  }

  /*
  @Get()
  public async getUser(@User() user: AuthUser) {
    return user;
  }
  */

  /*
  @Get('profile')
  public async getProfile(@User() user: AuthUser) {
    return await this.userService.getProfile(user.id);
  }

  @Patch('profile')
  public async updateProfile(
    @User() user: AuthUser,
    @Body() patchUserProfileDto: PatchUserProfileDto,
  ) {
    return await this.userService.patchProfile(user.id, patchUserProfileDto);
  }
  */
}
