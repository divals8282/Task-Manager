import { IsNumber } from 'class-validator';

export class TaskToListDTO {
  @IsNumber()
  taskId: number;

  @IsNumber()
  listId: number;
}
