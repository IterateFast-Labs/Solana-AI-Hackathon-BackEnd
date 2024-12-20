import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { InputOptionType } from '../type';

export class PostDataLabelingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dataSetId: string;

  @ApiProperty()
  @IsEnum(InputOptionType)
  @IsNotEmpty()
  inputOption: InputOptionType;
}
