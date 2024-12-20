import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { DatabaseService } from '@providers/database/database.service';

@Injectable()
export class PeriodicService {
  constructor(private readonly databaseService: DatabaseService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async initUserClickerTicket() {
    await this.databaseService.inventory.updateMany({
      data: {
        clickerTicket: 3,
      },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async initUsersDailyLogin() {
    await this.databaseService.userInGameTaskHistory.updateMany({
      data: {
        dailyLogin: false,
        dailyLabeling: false,
        dailyClicker: false,
        dailyInvite: false,
      },
    });
  }
}
