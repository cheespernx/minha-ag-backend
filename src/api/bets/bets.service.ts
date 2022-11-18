import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './entities/bets.entity';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Bet)
    private readonly betsRepository: Repository<Bet>,
  ) {}

  async createNewBet(data) {
    try {
      let bet = new Bet();
      bet = { ...data };
      await this.betsRepository.save(bet);
    } catch (error) {
      throw new HttpException(
        {
          message:
            'Ocorreu um erro durante a criação da sua aposta! - ' +
            error.message,
        },
        500,
      );
    }
  }
}
