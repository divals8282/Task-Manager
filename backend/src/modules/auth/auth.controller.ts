import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { User } from '../../entities/user.entity';

import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req) {
    return req.user as User;
  }

  @Post('register')
  async register(@Body() body: UserDTO) {
    const userExists = await this.authService.checkIfUserExists(body.email);

    if (userExists) {
      throw new BadRequestException({
        success: false,
        statusCode: 400,
        message: 'User with this email already exists',
      });
    }

    return await this.authService.createUser(body);
  }

  @Get('refresh-credentials')
  async refreshToken(
    @Headers('x-refresh-token') refreshToken: string | undefined,
  ) {
    if (!refreshToken)
      throw new BadRequestException('No refresh token provided');

    return await this.authService.refreshTokens(refreshToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('logout')
  async logout(@Req() req) {
    const user: User = req.user as User;

    return await this.authService.logout(user);
  }
}
