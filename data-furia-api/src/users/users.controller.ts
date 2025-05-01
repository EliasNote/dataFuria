import { Body, Controller, Query, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Post('extract')
  async validateWebsite(@Query('url') url: string, @Query('cpf') cpf: string) {
    return this.usersService.validateAI(url, cpf);
  }
}
