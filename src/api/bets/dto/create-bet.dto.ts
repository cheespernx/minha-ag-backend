import { Expose } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

export class CreateBetDTO {
  @Expose({ name: 'bet_cotation' })
  @IsString()
  @MaxLength(35)
  betCotation: string;

  @Expose({ name: 'bet_value' })
  @IsString()
  @MaxLength(8)
  betValue: string;

  @Expose({ name: 'bet_games' })
  @IsString()
  @MaxLength(80)
  betGames: string;
}
