import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDTO, GetUserDTO } from './dto';
import { UsersService } from './users.service';
import { camelizeKeys } from 'src/utils';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createNewUser(@Res() response, @Body() requestData: CreateUserDTO) {
    const data = camelizeKeys(requestData);
    await this.usersService.createNewUser(data);
    return response.status(200).json({
      status: 200,
      message: 'Usuário criado com sucesso!',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Body() requestData: GetUserDTO) {
    const { user } = requestData;
    return this.usersService.getUser(user.user_id);
  }
}
