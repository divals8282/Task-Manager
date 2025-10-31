import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemListDTO } from './dto/task.dto';
import { ItemList } from '../../entities/item-list.entity';

@Injectable()
export class ItemListService {
  constructor(
    @InjectRepository(ItemList)
    private readonly itemListRepository: Repository<ItemList>,
  ) {}

  fetchItemLists() {
    return this.itemListRepository.find();
  }

  async CEItemList(data: ItemListDTO) {
    const itemList = this.itemListRepository.create(data);
    return await this.itemListRepository.save(itemList);
  }

  async deleteItemList(id: number) {
    const itemList = await this.itemListRepository.findOne({
      where: { id },
    });

    if (!itemList) {
      throw new NotFoundException({
        data: null,
        statusCode: 404,
        message: 'Item not found.',
      });
    }

    return await this.itemListRepository.delete(id);
  }
}
