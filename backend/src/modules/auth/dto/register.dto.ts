import { IsEmail, IsString } from 'class-validator';

export class RegistrationDTO {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  password: string;
}
