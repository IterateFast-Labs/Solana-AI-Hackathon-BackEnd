import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { InGameTask } from '../type';

export class UpsertInGameTaskDto {
  @ApiProperty()
  @IsEnum(InGameTask)
  @IsNotEmpty()
  inGameTask: InGameTask;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  point: number;
}
