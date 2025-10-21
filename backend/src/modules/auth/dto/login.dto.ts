import { IsEmail, IsString } from 'class-validator';
import { UserDTO } from './user.dto';

export class LoginDTO implements Pick<UserDTO, 'email' | 'password'> {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
