import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { BetsService } from './bets.service';

@Controller('api/v1/bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getBetsByUser(@Req() req) {
    const { user } = req;
    return this.betsService.getBetsByUser(user.userId);
  }
}
