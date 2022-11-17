import { IsNotEmpty } from 'class-validator';
import { User } from '../interfaces/user.interface';

export class GetUserDTO {
  @IsNotEmpty()
  user: User;
}
