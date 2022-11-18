import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Bet } from 'src/api/bets/entities/bets.entity';

@Entity('tb_users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({ name: 'user_email', unique: true })
  userEmail: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'user_password' })
  userPassword: string;

  @OneToMany(() => Bet, (bets) => bets.user, { eager: true })
  bets: Bet[];

  @CreateDateColumn({ name: 'user_created_at' })
  userCreatedAt: Date;

  @UpdateDateColumn({ name: 'user_updated_at' })
  userUpdatedAt: Date;

  @DeleteDateColumn({ name: 'user_deleted_at' })
  userDeletedAt: Date;

  @BeforeInsert()
  hashPassword() {
    this.userPassword = hashSync(this.userPassword, 10);
  }
}
