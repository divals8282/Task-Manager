import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository, DataSource } from 'typeorm';
import { User, Auth } from '../../entities';
import { UserDTO } from './dto/user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async checkIfUserExists(email: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    return !!existingUser;
  }

  async createUser(user: UserDTO) {
    const hashPassword = await bcrypt.hash(user.password, 10);

    return await this.dataSource.transaction(async (manager) => {
      const newAuth = manager.create(Auth, {
        password: hashPassword,
        accessToken: '',
        refreshToken: '',
      });

      await manager.save(newAuth);

      const newUser = manager.create(User, {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        auth: newAuth,
      });

      await manager.save(newUser);

      return newUser;
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['auth'],
    });

    if (user && (await bcrypt.compare(password, user.auth.password))) {
      return user;
    }

    return null;
  }

  async createCredentialsForUser(user: User) {
    const payload = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });

    user.auth.accessToken = accessToken;
    user.auth.refreshToken = refreshToken;

    await this.authRepository.save(user.auth);

    return user;
  }

  async refreshTokens(refreshToken: string) {
    const user = await this.userRepository.findOne({
      where: { auth: { refreshToken } },
      relations: ['auth'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
      return this.createCredentialsForUser(user);
    } catch {
      throw new UnauthorizedException('expired refresh token');
    }
  }

  async getUserInfo(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['auth'],
    });

    return user;
  }

  async logout(user: User) {
    user.auth.accessToken = '';
    user.auth.refreshToken = '';

    await this.authRepository.save(user.auth);

    return { success: true, status: 200, message: 'Logged out successfully' };
  }
}
