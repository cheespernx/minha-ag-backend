import { Bet } from 'src/api/bets/entities/bets.entity';

export interface User {
  user_id: string;
}

export interface UserInterface {
  userId: string;
  userName: string;
  userEmail: string;
  userBets: Bet[];
}
