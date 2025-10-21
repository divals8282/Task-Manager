import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @IsOptional()
  id?: number;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  password: string;
}
