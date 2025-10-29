import { IsNumber } from 'class-validator';

export class StoryToEpicDTO {
  @IsNumber()
  storyId: number;

  @IsNumber()
  epicId: number;
}
