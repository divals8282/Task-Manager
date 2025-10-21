import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
