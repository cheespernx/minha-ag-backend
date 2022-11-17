import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './api/users/users.module';
import { BetsModule } from './api/bets/bets.module';
import mySQLConfig from './config/mysql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(mySQLConfig),
    AuthModule,
    UsersModule,
    BetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
