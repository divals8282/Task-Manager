import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, ItemList, Story, Epic } from '../../entities';
import { Repository } from 'typeorm';
import { TaskToListDTO } from './dto/task-to-list.dto';
import { TaskToStoryDTO } from './dto/task-to-story.dto';
import { StoryToEpicDTO } from './dto/story-to-epic.dto';
@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
    @InjectRepository(Epic)
    private readonly epicRepository: Repository<Epic>,
    @InjectRepository(ItemList)
    private readonly itemListRepository: Repository<ItemList>,
  ) {}

  async moveTaskToList(data: TaskToListDTO) {
    const { listId, taskId } = data;

    const currentTask = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['itemList'],
    });

    if (!currentTask) {
      throw new NotFoundException({
        message: 'Task not found',
        statusCode: 404,
      });
    }

    const newList = await this.itemListRepository.findOne({
      where: { id: listId },
    });

    if (!newList) {
      throw new NotFoundException({
        message: 'List not found',
        statusCode: 404,
      });
    }

    return this.taskRepository.save({ ...currentTask, itemList: newList });
  }

  async attachTaskToStory(body: TaskToStoryDTO) {
    const { storyId, taskId } = body;

    const [task, story] = await Promise.all([
      this.taskRepository.findOne({
        where: { id: taskId },
      }),
      this.storyRepository.findOne({
        where: { id: storyId },
      }),
    ]);

    if (!task) {
      throw new NotFoundException({
        message: 'Task not found',
        statusCode: 404,
      });
    }

    if (!story) {
      throw new NotFoundException({
        message: 'Story not found',
        statusCode: 404,
      });
    }

    return this.taskRepository.save({ ...task, story });
  }

  async attachStoryToEpic(body: StoryToEpicDTO) {
    const { epicId, storyId } = body;

    const [story, epic] = await Promise.all([
      this.storyRepository.findOne({
        where: { id: storyId },
      }),
      this.epicRepository.findOne({
        where: { id: epicId },
      }),
    ]);

    if (!story) {
      throw new NotFoundException({
        message: 'Story not found',
        statusCode: 404,
      });
    }

    if (!epic) {
      throw new NotFoundException({
        message: 'Epic not found',
        statusCode: 404,
      });
    }

    return this.storyRepository.save({ ...story, epic });
  }

  async deleteTaskFromList(taskId: number) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    return this.taskRepository.save({ ...task, itemList: undefined });
  }
}
