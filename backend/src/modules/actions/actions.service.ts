import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, ItemList } from '../../entities';
import { Repository } from 'typeorm';
@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(ItemList)
    private readonly itemListRepository: Repository<ItemList>,
  ) {}
}
