import { IsNotEmpty } from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';

export class GetUserDTO {
  @IsNotEmpty()
  user: UserInterface;
}
