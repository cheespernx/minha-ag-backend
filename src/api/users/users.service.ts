import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createNewUser(data) {
    try {
      const user = await this.usersRepository.create(data);
      await this.usersRepository.save(user);
    } catch (error) {
      const message = error.message.includes('Duplicate entry')
        ? MessagesHelper.DUPLICATE_INDEX
        : error.message;
      throw new HttpException(
        {
          message:
            'Ocorreu um erro durante a criação da sua conta! - ' + message,
        },
        500,
      );
    }
  }

  async findByEmail(userEmail: string) {
    return await this.usersRepository.findOne({
      where: { userEmail },
    });
  }

  async getUser(userId: string) {
    try {
      return await this.usersRepository.findOneOrFail({
        select: ['userId', 'userName', 'userEmail', 'userBets'],
        where: { userId },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
