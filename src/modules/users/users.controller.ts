import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users';
import { UsersDto } from './dto';
import { Public } from 'src/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('getUser')
  @HttpCode(HttpStatus.OK)
  async getUser(@Body() dto: UsersDto): Promise<Users | null> {
    return this.usersService.getUser(dto);
  }
}
