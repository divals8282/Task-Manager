import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegistrationDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDTO) {
    console.log({
      body,
    });
    return true;
  }

  @Post('register')
  register(@Body() body: RegistrationDTO) {
    console.log({
      body,
    });
    return true;
  }
}
