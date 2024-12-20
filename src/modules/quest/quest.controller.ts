import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/commons/decorators/request/user.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { AuthUser } from 'src/types';
import { GetQuestsDto } from './dtos/get-quests.dto';
import { PostCheckInDto } from './dtos/post-check-in.dto';
import { UpsertInGameTaskDto } from './dtos/upsert-in-game-task.dto';
import { QuestService } from './quest.service';

@Controller('quests')
@ApiTags('Quests')
@ApiBearerAuth('accessToken')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Get('/quests')
  public async getQuests(@Query() query: GetQuestsDto) {
    const { page, size, filter } = query;
    return await this.questService.getQuests(page, size, filter);
  }

  @Get(':questId/quest')
  public async getQuest(@Param('questId') questId: string) {
    return await this.questService.getQuest(questId);
  }

  @Get(':questId/userStatus')
  @UseGuards(AuthGuard)
  public async getQuestUserStatus(
    @User() user: AuthUser,
    @Param('questId') questId: string,
  ) {
    return await this.questService.getQuestUserStatus(user.id, questId);
  }

  @Post(':questId/tasks/:taskId/check')
  @UseGuards(AuthGuard)
  public async finishQuestTask(
    @User() user: AuthUser,
    @Param('questId') questId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.questService.finishQuestTask(user.id, questId, taskId);
  }

  @Get('/inGameTask')
  @UseGuards(AuthGuard)
  public async getInGameTask(@User() user: AuthUser) {
    return await this.questService.getInGameTask(user.id);
  }

  @Post('/:taskName/inGameTask')
  async task(
    @User() user: AuthUser,
    @Body() upsertInGameTaskDto: UpsertInGameTaskDto,
  ) {
    const { inGameTask, point } = upsertInGameTaskDto;
    return await this.questService.inGameTaskAction(user.id, inGameTask, point);
  }

  @Get('/checkIn')
  @UseGuards(AuthGuard)
  public async getCheckIn(@User() user: AuthUser) {
    return await this.questService.getCheckIn(user.id);
  }

  @Get('/checkInHistory')
  @UseGuards(AuthGuard)
  public async getCheckInHistory(@User() user: AuthUser) {
    return await this.questService.getCheckInHistory(user.id);
  }

  @Post('/checkIn')
  @UseGuards(AuthGuard)
  async checkIn(
    @User() user: AuthUser,
    @Body() postCheckInDto: PostCheckInDto,
  ) {
    const { day, checkInEventId } = postCheckInDto;
    return await this.questService.checkInAction(user.id, day, checkInEventId);
  }
}
