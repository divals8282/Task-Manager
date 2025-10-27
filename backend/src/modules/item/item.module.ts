import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Epic, Story, Task } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Story, Epic])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
