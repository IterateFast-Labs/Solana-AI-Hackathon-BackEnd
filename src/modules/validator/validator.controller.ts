import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/commons/decorators/request/user.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { AuthUser } from 'src/types';
import { GetValidationsDto } from './dtos/get-validations.dto';
import { PostValidationDto } from './dtos/post-validation.dto';
import { ValidatorService } from './validator.service';

@Controller('validator')
@ApiTags('Validator')
@UseGuards(AuthGuard)
@ApiBearerAuth('accessToken')
export class ValidatorController {
  constructor(private readonly validatorService: ValidatorService) {}

  @Get('/:id')
  public async getValidation(@User() user: AuthUser, @Param('id') id: string) {
    return await this.validatorService.getValidation(user.id, id);
  }

  @Get('/')
  public async getValidations(
    @User() user: AuthUser,
    @Query() getValidationsDto: GetValidationsDto,
  ) {
    return await this.validatorService.getValidations(
      user.id,
      getValidationsDto,
    );
  }

  @Post('/')
  public async validate(
    @User() user: AuthUser,
    @Body() postValidationDto: PostValidationDto,
  ) {
    return await this.validatorService.validate(user.id, postValidationDto);
  }
}
