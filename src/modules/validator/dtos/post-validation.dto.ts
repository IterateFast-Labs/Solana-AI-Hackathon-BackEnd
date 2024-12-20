import { ApiProperty } from '@nestjs/swagger';
import { InputOptionType } from '@prisma/db';
import { IsEnum, IsString } from 'class-validator';

export class PostValidationDto {
  @ApiProperty()
  @IsString()
  labelingValidationId: string;

  @ApiProperty()
  @IsEnum(InputOptionType)
  validationInput: InputOptionType;
}
