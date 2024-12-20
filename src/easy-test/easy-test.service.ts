import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/db';
import { DatabaseService } from '@providers/database/database.service';
import { RedisService } from '@providers/redis/redis.service';

@Injectable()
export class EasyTestService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(walletAddress: string) {
    const user: user = await this.databaseService.user.findUnique({
      where: {
        walletAddress: walletAddress.toLowerCase(),
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.generateAccessToken(user);
  }

  private async generateAccessToken(user: user): Promise<string> {
    const payload = {
      iss: 'IF_LABS_SERVER',
      aud: user.id,
    };
    const jwt: string = this.jwtService.sign(payload);

    await this.redisService.set(
      `auth:user:${user.id}`,
      jwt,
      Number(process.env.JWT_EXPIRE_TIME),
    );

    return jwt;
  }
}
