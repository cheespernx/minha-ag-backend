import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './entities/bets.entity';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Bet)
    private readonly betsRepository: Repository<Bet>,
  ) {}

  async getBetsByUser(userId: string) {
    try {
      return await this.betsRepository.find({ where: { userId } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
