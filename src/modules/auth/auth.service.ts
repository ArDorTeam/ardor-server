import * as argon from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { ConfigService } from '@nestjs/config';
// import { Snowflake } from 'node-snowflake';
import { v4 } from 'uuid'
@Injectable()
export class AuthService {
  // private readonly snowflake: Snowflake;
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {
    // this.snowflake = new Snowflake({
    //   workerIdBits: 5,
    //   datacenterIdBits: 5,
    // });
  }

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    console.log(11, dto)
    const password = await argon.hash(dto.password);
    // const user_id = this.snowflake.generate();
    const user_id = v4()
  
    const user = await this.prisma.t_user
      .create({
        data: {
          email: dto.email,
          password,
          user_id,
          user_name: dto.email,
          role_id: 0
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user.user_id, user.email);
    // await this.updateRtHash(user.user_id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.t_user.findUnique({
      where: {
        user_name: dto.email,
        email: dto.email
      }
    })

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.user_id, user.email)

    return tokens;
  }

  async logout(user_id: string): Promise<Boolean> {
    await this.prisma.t_user.updateMany({
      where: {
        user_id: user_id,
        // hashedRt: {
        //   not: null,
        // }
      },
      data: {
        // hashedRt: null,
      }
    });
    return true;
  }

  // async refreshTokens(user_id: string, rt: string): Promise<Tokens> {
  //   const user = await this.prisma.t_user.findUnique({
  //     where: {
  //       user_id: user_id,
  //     },
  //   });
  //   if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied')

  //   const rtMatches = await argon.verify(user.hashedRt, rt);
  //   if (!rtMatches) throw new ForbiddenException('Access Denied');

  //   const tokens = await this.getTokens(user.user_id, user.email);
  //   await this.updateRtHash(user.user_id, tokens.refresh_token);

  //   return tokens;
  // }

  async updateRtHash(user_id: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.t_user.update({
      where: {
        user_id: user_id,
      },
      data: {
        // hashedRt: hash,
      },
    });
  }

  async getTokens(user_id, email) {
    const jwtPayload: JwtPayload = {
      sub: user_id,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  } 
}

