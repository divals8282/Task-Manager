import { Module } from '@nestjs/common';
import { ItemListController } from './item-list.controller';
import { ItemListService } from './item-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemList } from '../../entities/item-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemList])],
  controllers: [ItemListController],
  providers: [ItemListService],
})
export class ItemListModule {}
