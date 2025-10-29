import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Story } from './story.entity';
import { User } from './user.entity';
import { ItemList } from './item-list.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Story, (story) => story.tasks)
  @JoinColumn()
  story: Story;

  @ManyToOne(() => ItemList, (itemList) => itemList.id)
  @JoinColumn()
  itemList: ItemList;
}
