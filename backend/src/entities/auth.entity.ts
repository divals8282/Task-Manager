import { Optional } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('auths')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Optional()
  accessToken: string;

  @Column()
  @Optional()
  refreshToken: string;

  @Column()
  password: string;
}
