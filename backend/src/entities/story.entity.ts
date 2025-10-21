import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';
import { Epic } from './epic.entity';

@Entity('stories')
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @OneToOne(() => Epic, (epic) => epic.id)
  @JoinColumn()
  epic: Epic;

  @OneToMany(() => Task, (task) => task.id, { nullable: true })
  @JoinColumn()
  tasks: Task[];
}
