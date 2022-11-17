import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDTO {
  @Expose({ name: 'user_name' })
  @IsNotEmpty()
  @MaxLength(40)
  @IsString()
  userName: string;

  @Expose({ name: 'user_email' })
  @IsString()
  @MaxLength(35)
  @IsEmail()
  userEmail: string;

  @Expose({ name: 'user_password' })
  @MaxLength(20)
  @IsString()
  @Matches(RegexHelper.password, {
    message: MessagesHelper.INVALID_PASSWORD,
  })
  userPassword: string;
}
