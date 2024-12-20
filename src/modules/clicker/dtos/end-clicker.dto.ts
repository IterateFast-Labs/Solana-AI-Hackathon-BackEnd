import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EndClickerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userClickerHistoryId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  point: number;
}
