import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/commons/decorators/request/user.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { AuthUser } from 'src/types';
import { ClickerService } from './clicker.service';
import { EndClickerDto } from './dtos/end-clicker.dto';
import { StartClickerDto } from './dtos/start-clicker.dto';

@Controller('clicker')
@ApiTags('Clicker Play')
@UseGuards(AuthGuard)
@ApiBearerAuth('accessToken')
export class ClickerController {
  constructor(private readonly clickerService: ClickerService) {}

  @Get('/')
  public async getAllClickerStages(@User() user: AuthUser) {
    return await this.clickerService.getAllClickerStages(user.id);
  }

  @Get('/:clickerStageId')
  public async getClickerStageById(
    @User() user: AuthUser,
    @Param('clickerStageId') clickerStageId: string,
  ) {
    return await this.clickerService.getClickerStageById(
      user.id,
      clickerStageId,
    );
  }

  @Post('start')
  public async startClickerPlay(
    @User() user: AuthUser,
    @Body() startClickerDto: StartClickerDto,
  ) {
    const { clickerStageId } = startClickerDto;

    return await this.clickerService.startClickerPlay(user.id, clickerStageId);
  }

  @Post('end')
  public async endClickerPlay(
    @User() user: AuthUser,
    @Body() endClickerDto: EndClickerDto,
  ) {
    const { userClickerHistoryId, point } = endClickerDto;

    return await this.clickerService.endClickerPlay(
      user.id,
      userClickerHistoryId,
      point,
    );
  }
}
