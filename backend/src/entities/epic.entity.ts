import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Story } from './story.entity';
import { User } from './user.entity';

@Entity('epics')
export class Epic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @OneToMany(() => Story, (story) => story.id)
  @JoinColumn()
  stories: Story[];
}
