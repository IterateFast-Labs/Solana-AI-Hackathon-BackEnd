import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
//import { i18nValidationMessage } from 'nestjs-i18n';

export class PatchUserNicknameDto {
  @ApiProperty()
  @IsString()
  nickname: string;
}
