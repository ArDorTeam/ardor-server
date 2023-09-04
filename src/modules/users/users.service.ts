import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Users } from './users';
import { UsersDto } from './dto';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService
  ) {}
  async getUser(dto: UsersDto): Promise<Users | null> {
    const user = await this.prisma.t_user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (!user) return null;

    const responseData: Users = {
      user_id: user.user_id,
      user_avatar: user.user_avatar,
      user_name: user.user_name,
      mobile: user.mobile,
      email: user.email,
      token: user.token,
      role_id: user.role_id,
      status: user.status
    }

    return responseData;
  }
}
