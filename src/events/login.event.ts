import { UserInterface } from '../api/users/interfaces/user.interface';

export class LoginEvent {
  user: UserInterface;
  sessionId: string;

  constructor(user, sessionId) {
    this.user = user;
    this.sessionId = sessionId;
  }
}
