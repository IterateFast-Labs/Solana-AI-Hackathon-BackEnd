import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/commons/decorators/request/user.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { AuthUser } from 'src/types';
import { AuthService } from './auth.service';
import { CreateNonceDto } from './dtos/create-nonce.dto';
import { PatchLoginDto } from './dtos/patch-login.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Patch('login/telegram')
  async login(@Body() body: PatchLoginDto) {
    const { telegramId, telegramName, telegramHandle, referralCode } = body;

    return await this.authService.loginWithTelegram(
      telegramId,
      telegramName,
      telegramHandle,
      referralCode,
    );
  }

  @Delete('logout')
  @UseGuards(AuthGuard)
  public async logout(@User() user: AuthUser) {
    return await this.authService.logout(user.id);
  }

  @Post('nonce')
  async getNonce(@Body() body: CreateNonceDto) {
    const { walletAddress } = body;
    return this.authService.createNonce(walletAddress);
  }

  @Get('server-pubkey')
  public async getServerPubkey() {
    return process.env.RAW_PUBLIC_KEY;
  }
}
