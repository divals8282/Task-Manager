import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './task.entity';

@Entity('item-lists')
export class ItemList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  position: number;

  @OneToMany(() => Task, (task) => task.itemList, { nullable: true })
  tasks: Task[];
}
