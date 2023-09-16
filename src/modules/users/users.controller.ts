import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users';
import { UserDto, UpdateUserDto, DeleteUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('getUser')
  @HttpCode(HttpStatus.OK)
  async getUser(@Body() userData: UserDto): Promise<Users | null> {
    return this.usersService.getUser(userData);
  }

  @Post('updateUser')
  async updateUser(@Body() userData: UpdateUserDto): Promise<Users | null> {
    return this.usersService.updateUser(userData)
  }

  @Post('deleteUser')
  async deleteUser(@Body() userData: DeleteUserDto): Promise<Boolean> {
    return this.usersService.deleteUser(userData);
  }
}
