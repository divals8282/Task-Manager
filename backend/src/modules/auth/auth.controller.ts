import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDTO) {
    return true;
  }

  @Post('register')
  async register(@Body() body: UserDTO) {
    const userExists = await this.authService.checkIfUserExists(body.email);

    if (userExists) {
      throw new BadRequestException({
        success: false,
        status: 400,
        message: 'User with this email already exists',
      });
    }

    return await this.authService.createUser(body);
  }
}
