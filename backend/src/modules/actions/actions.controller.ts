import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ActionsService } from './actions.service';
import { AuthGuard } from '@nestjs/passport';
import { TaskToListDTO } from './dto/task-to-list.dto';
import { StoryToEpicDTO } from './dto/story-to-epic.dto';
import { TaskToStoryDTO } from './dto/task-to-story.dto';

@Controller('actions')
@UseGuards(AuthGuard('jwt'))
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post('attach-story-to-epic')
  attachStoryToEpic(@Body() body: StoryToEpicDTO) {
    return this.actionsService.attachStoryToEpic(body);
  }

  @Post('attach-task-to-story')
  attachTaskToStory(@Body() body: TaskToStoryDTO) {
    return this.actionsService.attachTaskToStory(body);
  }

  @Post('move-task-to-list')
  moveTaskToList(@Body() body: TaskToListDTO) {
    return this.actionsService.moveTaskToList(body);
  }

  @Delete('delete-task-from-list/:taskId')
  deleteTaskFromList(@Param('taskId') id: string) {
    const taskid = isNaN(Number(id)) ? 0 : Number(id);

    return this.actionsService.deleteTaskFromList(taskid);
  }
}
