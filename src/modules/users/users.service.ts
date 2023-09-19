import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Users } from './users';
import { UserDto, UpdateUserDto, DeleteUserDto } from './dto';
import { Prisma } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService
  ) {}
  async getUser(dto: UserDto): Promise<Users | null> {
    const user = await this.prisma.t_user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const responseData: Users = {
      user_id: user.user_id,
      user_avatar: user.user_avatar,
      user_name: user.user_name,
      mobile: user.mobile,
      email: user.email,
      role_id: user.role_id,
      status: user.status
    }

    return responseData;
  }

  // 更新用户
  async updateUser(query: UpdateUserDto): Promise<Users | null> {
    const data = {
      ...query,
      user_id: String(query.user_id)
    }

    const user =  await this.prisma.t_user.update({
      where: { user_id: data.user_id },
      data
    })

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const responseData: Users = {
      user_id: user.user_id,
      user_avatar: user.user_avatar,
      user_name: user.user_name,
      mobile: user.mobile,
      email: user.email,
      role_id: user.role_id,
      status: user.status
    }

    return responseData
  }

  async deleteUser(userData: DeleteUserDto): Promise<Boolean> {
    const user = await this.prisma.t_user.findUnique({
      where: { user_id: userData.user_id }
    })

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.t_user.delete({
      where: { user_id: userData.user_id }
    })

    return true

    // try {
    //   await this.prisma.$transaction([
    //     // this.prisma.profile.deleteMany({
    //     //   where: { user_id: userData.user_id }
    //     // }),
    //     this.prisma.t_user.delete({
    //       where: { user_id: userData.user_id }
    //     })
    //   ])
    // } catch (e) {
    //   if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
    //     throw new ConflictException('cannot delete user with related record')
    //   } else {
    //     throw new InternalServerErrorException('Failed to delete user')
    //   }
    // }
  }
}
