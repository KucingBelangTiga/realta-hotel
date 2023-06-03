import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PriceItemsService } from './price-items.service';
import { CreatePriceItemsDto } from './price-items.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PriceItems } from 'output/entities/PriceItems';

@Controller('price-items')
export class PriceItemsController {
  constructor(private Services: PriceItemsService) {}
  @Get()
  public async getAll() {
    return await this.Services.findAll();
  }
  @Get('/page')
  public async getPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('type') type: string,
    @Query('name') name: string,
  ): Promise<Pagination<PriceItems>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.findPage(
      {
        page,
        limit,
      },
      type,
      name,
    );
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
  }
  @Post()
  public async create(
    @Body()
    masterDetail: CreatePriceItemsDto,
  ) {
    return await this.Services.create(masterDetail);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    masterDetail: CreatePriceItemsDto,
  ) {
    return await this.Services.update(id, masterDetail);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
