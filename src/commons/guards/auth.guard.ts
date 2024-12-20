import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/db';
import { DatabaseService } from '@providers/database/database.service';
import { RedisService } from '@providers/redis/redis.service';
import { Request } from 'express';
import { JwtPayload } from 'src/types';

/**
 * @summary
 * 인증이 필요한 API 에 대한 Guard 입니다.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly databaseService: DatabaseService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.path;
    // const method = request.method.toUpperCase();

    const token = this.extractTokenFromHeader(request);

    if (this.checkPublicAPI(context)) {
      return true;
    }

    if (!token) {
      //throw new BadRequestException('error.NO_AUTH_TOKEN');
      throw new BadRequestException('No auth token provided');
    }

    const payload: JwtPayload = await this.getPayloadFromJwt(token);

    await this.validateRegisteredJWT(path, payload, token);

    // Check if user exists
    const user: Partial<user> = await this.checkUserByPayloadData(payload);

    // Inject user data into request
    request['parsedPayload'] = { originalJwtPayload: payload, user, token };

    return true;
  }

  private checkPublicAPI(context: ExecutionContext): boolean {
    const isPublic: [] = this.reflector.getAll('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic.find(() => true)) {
      return true;
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const auth = request.headers.authorization;

    if (!auth) {
      return null;
    }

    const [type, token] = auth.split(' ');
    const parsedToken = type === 'Bearer' ? token : null;

    return parsedToken;
  }

  private async getPayloadFromJwt(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
        ignoreExpiration: false,
      });
    } catch (error) {
      //throw new UnauthorizedException('error.INVALID_AUTH_TOKEN');
      throw new UnauthorizedException('Invalid auth token');
    }
  }

  private async checkUserByPayloadData(jwtPayload: JwtPayload) {
    // Check if user exists
    const user: user = await this.databaseService.user.findUnique({
      where: {
        id: jwtPayload.aud,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async validateRegisteredJWT(
    path: string,
    payload: JwtPayload,
    requestedToken: string,
  ) {
    let existJwt: string;
    try {
      existJwt = await this.redisService.get(`auth:user:${payload.aud}`);

      if (!existJwt) {
        if (path === '/auth/logout') {
          return;
        } else {
          //throw new UnauthorizedException('error.INVALID_AUTH_TOKEN');
          throw new UnauthorizedException('Invalid auth token');
        }
      }
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('error.INTERNAL_SERVER_ERROR');
    }

    if (existJwt !== requestedToken) {
      //throw new UnauthorizedException('error.INVALID_AUTH_TOKEN');
      throw new UnauthorizedException('Invalid auth token');
    }
  }
}
