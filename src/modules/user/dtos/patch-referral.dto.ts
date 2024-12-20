import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
//import { i18nValidationMessage } from 'nestjs-i18n';

export class PatchReferralDto {
  @ApiProperty()
  @IsString()
  referralCode: string;
}
