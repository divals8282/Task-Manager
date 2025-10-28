import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ItemListService } from './item-list.service';
import { ItemListDTO } from './dto/task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('item-list')
@UseGuards(AuthGuard('jwt'))
export class ItemListController {
  constructor(private readonly itemListService: ItemListService) {}

  @Get('all')
  async getAll() {
    const data = await this.itemListService.fetchItemLists();

    return {
      data,
      status: 200,
      message: `Item list fetched successfully`,
    };
  }

  @Post('ce-item-list')
  async CEItem(@Body() body: ItemListDTO) {
    console.log({
      body,
    });
    return this.itemListService.CEItemList(body);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    const itemListId = isNaN(Number(id)) ? 0 : Number(id);

    return await this.itemListService.deleteItemList(itemListId);
  }
}
