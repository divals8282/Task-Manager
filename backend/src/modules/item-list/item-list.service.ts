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

    if (!data.id) {
      const count = await this.itemListRepository.count();
      const itemList = this.itemListRepository.create({
        ...data,
        position: count + 1,
      });
      return this.itemListRepository.save(itemList);
    }

    const itemListInDB = await this.itemListRepository.findOne({
      where: { id: data.id },
    });

    if (!itemListInDB) {
      throw new Error('ItemList not found');
    }

    // If position changed → reorder others
    if (data.position && data.position !== itemListInDB.position) {
      const newPosition = data.position;
      const oldPosition = itemListInDB.position;

      if (newPosition > oldPosition) {
        // Moving down → shift up items between old+1 and new
        await this.itemListRepository
          .createQueryBuilder()
          .update()
          .set({ position: () => `"position" - 1` })
          .where(`"position" > :oldPosition AND "position" <= :newPosition`, {
            oldPosition,
            newPosition,
          })
          .execute();
      } else {
        // Moving up → shift down items between new and old-1
        await this.itemListRepository
          .createQueryBuilder()
          .update()
          .set({ position: () => `"position" + 1` })
          .where(`"position" >= :newPosition AND "position" < :oldPosition`, {
            oldPosition,
            newPosition,
          })
          .execute();
      }

      // Update the item’s own position
      itemListInDB.position = newPosition;
    }

    // Update other fields if needed
    Object.assign(itemListInDB, data);

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
