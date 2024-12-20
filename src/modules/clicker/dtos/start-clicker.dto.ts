import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StartClickerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clickerStageId: string;
}
