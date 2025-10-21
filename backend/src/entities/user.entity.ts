import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Auth } from './auth.entity';
import { Task } from './task.entity';
import { Story } from './story.entity';
import { Epic } from './epic.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  nickname: string;

  @OneToOne(() => Auth, (auth) => auth.id)
  @JoinColumn()
  auth: Auth;

  @OneToMany(() => Task, (task) => task.user, { nullable: true })
  tasks: Task[];

  @OneToMany(() => Story, (story) => story.user, { nullable: true })
  stories: Story[];

  @OneToMany(() => Epic, (epic) => epic.user, { nullable: true })
  epics: Epic[];
}
