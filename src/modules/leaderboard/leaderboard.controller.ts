import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/commons/decorators/request/user.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { AuthUser } from 'src/types';
import { GetLeaderboardDto } from './dtos/get-leaderboard.dto';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
@ApiTags('Leaderboard')
@ApiBearerAuth('accessToken')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @UseGuards(AuthGuard)
  public async getLeaderboard(
    @Query() query: GetLeaderboardDto,
    @User() user: AuthUser,
  ) {
    return await this.leaderboardService.getLeaderboard(
      user.id,
      query.type,
      query.size,
    );
  }

  @Get('/rank')
  @UseGuards(AuthGuard)
  public async getUserRank(
    @Query() query: GetLeaderboardDto,
    @User() user: AuthUser,
  ) {
    return await this.leaderboardService.getUserRankOnly(user.id, query.type);
  }
}
