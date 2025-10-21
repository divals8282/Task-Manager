import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('auths')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authToken: string;

  @Column()
  refreshToken: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
