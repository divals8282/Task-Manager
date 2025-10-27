import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RequestedUser } from '../../decorators/user.decorator';

import { ItemService } from './item.service';
import { ItemDTO } from './dto/task.dto';
import { AuthGuard } from '@nestjs/passport';
import { ItemEntity } from './types';
import { User } from '../../entities';

@Controller('item')
@UseGuards(AuthGuard('jwt'))
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('one/:entity/:id')
  async getOne(@Param('entity') entity: ItemEntity, @Param('id') id: string) {
    const itemId = isNaN(Number(id)) ? 0 : Number(id);
    const item = await this.itemService.fetchItemById(entity, itemId);

    if (item) {
      return {
        data: item,
        status: 200,
        message: `${entity} fetched successfully`,
      };
    }

    throw new NotFoundException({
      status: 404,
      message: `${entity} not found`,
    });
  }

  @Get('all/:entity')
  async getAll(
    @Param('entity') entity: ItemEntity,
    @Query('offset') o?: string,
    @Query('limit') l?: string,
  ) {
    const offset = isNaN(Number(o)) ? 0 : Number(o);
    const limit = isNaN(Number(l)) ? 10 : Number(l);

    const [data, total] = await this.itemService.fetchItems(
      entity,
      offset,
      limit,
    );

    return {
      total,
      data,
      status: 200,
      message: `${entity} fetched successfully`,
    };
  }

  @Post('ce-item/:entity')
  async CEItem(
    @Param('entity') entity: ItemEntity,
    @Body() body: ItemDTO,
    @RequestedUser() user: User,
  ) {
    return this.itemService.CEItem(user, entity, body);
  }

  @Delete('delete/:entity/:id')
  async delete(
    @Param('entity') entity: ItemEntity,
    @Param('id') id: string,
    @RequestedUser() user: User,
  ) {
    const itemId = isNaN(Number(id)) ? 0 : Number(id);

    return await this.itemService.deleteItem(entity, user, itemId);
  }
}
