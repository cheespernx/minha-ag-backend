import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginEvent } from 'src/events/login.event';
import { UserInterface } from '../users/interfaces/user.interface';
import { User } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import { Bet } from '../bets/entities/bets.entity';

export interface AuthPayloadI {
  userId: string;
  userName: string;
  userEmail: string;
  userBets: Bet[];
}

function authError() {
  throw new UnauthorizedException({
    status: false,
    message: 'Dados inválidos',
    errors: [
      {
        property: 'email',
        description: 'Usuário ou senha inválidos',
      },
      {
        property: 'password',
        description: 'Usuário ou senha inválidos',
      },
    ],
  });
}

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly usersService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await compare(password, user.userPassword))) {
      authError();
    }
    return user;
  }

  public async login(user, sessionId = null) {
    try {
      const accessToken = await this._sign(user);

      const { userId, userName, userEmail, userBets } = user;

      const userReturn: UserInterface = {
        userId,
        userName,
        userEmail,
        userBets,
      };

      if (sessionId) {
        await this.eventEmitter.emitAsync(
          'user.login',
          new LoginEvent(userReturn, sessionId),
        );
      }

      return {
        accessToken,
        user: userReturn,
      };
    } catch (err) {
      authError();
    }
  }

  private async _sign(user: User) {
    const { userId, userName, userEmail, userBets } = user;
    const payload: AuthPayloadI = {
      userId,
      userName,
      userEmail,
      userBets,
    };
    return this._jwtService.sign(payload);
  }
}
