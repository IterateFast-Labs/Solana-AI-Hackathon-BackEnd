import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PatchLoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telegramId: string;


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telegramName: string;


  @ApiProperty()
  @IsString()
  telegramHandle: string;


  @ApiProperty()
  @IsString()
  @IsOptional()
  referralCode: string;
}
