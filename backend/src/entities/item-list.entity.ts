import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('item-lists')
export class ItemList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  position?: number;
}
