import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegistrationDTO {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  username: string;
}
