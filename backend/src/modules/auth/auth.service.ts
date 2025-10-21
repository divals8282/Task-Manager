import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User, Auth } from '../../entities';
import { RegistrationDTO } from './dto/register.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private dataSource: DataSource,
  ) {}

  async checkIfUserExists(email: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    return !!existingUser;
  }

  async createUser(user: RegistrationDTO) {
    const hashPassword = await bcrypt.hash(user.password, 10);

    return await this.dataSource.transaction(async (manager) => {
      const newAuth = manager.create(Auth, {
        password: hashPassword,
        authToken: '',
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
}
