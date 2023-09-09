import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users';
import { UsersDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('getUser')
  @HttpCode(HttpStatus.OK)
  async getUser(@Body() dto: UsersDto): Promise<Users | null> {
    return this.usersService.getUser(dto);
  }

  @Delete(':user_id')
  async delUser(@Param('user_id') user_id: string): Promise<void> {
    this.usersService.delUser(user_id);
  }
}
