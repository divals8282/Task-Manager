import { Controller, UseGuards } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('actions')
@UseGuards(AuthGuard('jwt'))
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}
}
