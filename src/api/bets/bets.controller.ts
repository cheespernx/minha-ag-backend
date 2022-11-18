import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { camelizeKeys } from 'src/utils';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { BetsService } from './bets.service';
import { CreateBetDTO } from './dto';

@Controller('api/v1/bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNewBet(@Res() response, @Body() requestData: CreateBetDTO) {
    const data = camelizeKeys(requestData);
    await this.betsService.createNewBet(data);
    return response.status(200).json({
      status: 200,
      message: 'Aposta criada com sucesso!',
    });
  }
}
