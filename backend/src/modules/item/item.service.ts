import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Epic, Story, Task, User } from '../../entities';
import { Repository } from 'typeorm';
import { ItemDTO } from './dto/task.dto';
import { ItemEntity } from './types';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
    @InjectRepository(Epic)
    private readonly epicRepository: Repository<Epic>,
  ) {}

  private getRepositoryByEntity(
    entity: ItemEntity,
  ): Repository<Task | Story | Epic> {
    switch (entity) {
      case ItemEntity.TASK:
        return this.taskRepository;
      case ItemEntity.STORY:
        return this.storyRepository;
      case ItemEntity.EPIC:
        return this.epicRepository;
      default:
        return this.taskRepository;
    }
  }

  private setFetchItemsRelationsByEntity(entity: ItemEntity) {
    switch (entity) {
      case ItemEntity.TASK:
        return ['itemList', 'story'];
      case ItemEntity.STORY:
        return ['epic'];
      case ItemEntity.EPIC:
        return [];
    }
  }

  fetchItemById(entity: ItemEntity, id: number) {
    return this.getRepositoryByEntity(entity).findOne({ where: { id } });
  }

  fetchItems(entity: ItemEntity, offset: number, limit: number) {
    return this.getRepositoryByEntity(entity).findAndCount({
      skip: offset || 0,
      take: limit || 10,
      order: { id: 'DESC' },
      relations: ['user', ...this.setFetchItemsRelationsByEntity(entity)],
    });
  }

  async CEItem(author: User, entity: ItemEntity, data: ItemDTO) {
    const item = this.getRepositoryByEntity(entity).create(data);

    if (!item.id) {
      item.user = author;
    }

    if (item.id) {
      const existingItem = await this.getRepositoryByEntity(entity).findOne({
        where: { id: item.id },
        relations: ['user'],
      });

      if (existingItem && existingItem.user.id !== author.id) {
        throw new UnauthorizedException({
          data: null,
          status: 401,
          message: 'You are not authorized to update this item.',
        });
      }
    }

    return await this.getRepositoryByEntity(entity).save(item);
  }

  async deleteItem(entity: ItemEntity, author: User, id: number) {
    const item = await this.getRepositoryByEntity(entity).findOne({
      where: { id },
      relations: ['user'],
    });

    if (!item) {
      throw new NotFoundException({
        data: null,
        status: 404,
        message: 'Item not found.',
      });
    }

    if (item.user.id !== author.id) {
      throw new UnauthorizedException({
        data: null,
        status: 401,
        message: 'You are not authorized to update this item.',
      });
    }

    return await this.getRepositoryByEntity(entity).delete(id);
  }
}
