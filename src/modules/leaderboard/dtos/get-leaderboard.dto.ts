import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { LeaderboardType } from '../types';

export class GetLeaderboardDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  size?: number = 50;

  @ApiProperty()
  @IsOptional()
  @IsEnum(LeaderboardType)
  type?: LeaderboardType = LeaderboardType.TOTAL;
}
