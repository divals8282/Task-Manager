import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Epic, (epic) => epic.id)
  @JoinColumn()
  epic: Epic;

  @OneToMany(() => Task, (task) => task.id, { nullable: true })
  @JoinColumn()
  tasks: Task[];
}
