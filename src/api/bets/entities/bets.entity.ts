import { User } from 'src/api/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_bets')
export class Bet {
  @PrimaryGeneratedColumn('uuid')
  betId: string;

  @Column({ name: 'bet_cotation' })
  betCotation: string;

  @Column({ name: 'bet_value' })
  betValue: string;

  @Column({ name: 'bet_games' })
  betGames: string;

  @ManyToOne(() => User, (user) => user.bets)
  user: User;

  @CreateDateColumn({ name: 'bet_created_at' })
  betCreatedAt: Date;

  @UpdateDateColumn({ name: 'bet_updated_at' })
  betUpdatedAt: Date;

  @DeleteDateColumn({ name: 'bet_deleted_at' })
  betDeletedAt: Date;
}
