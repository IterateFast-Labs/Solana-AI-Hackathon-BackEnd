import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PostCheckInDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  day: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  checkInEventId: string;
}
