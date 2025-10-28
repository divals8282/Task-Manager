import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Epic, Story, Task } from '../../entities';
import { ItemList } from '../../entities/item-list.entity';

import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Story, Epic, ItemList])],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionsModule {}
