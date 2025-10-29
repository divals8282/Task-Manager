import { IsNumber } from 'class-validator';

export class TaskToStoryDTO {
  @IsNumber()
  taskId: number;

  @IsNumber()
  storyId: number;
}
