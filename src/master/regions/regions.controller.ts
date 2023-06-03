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
import { RegionsService } from './regions.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Regions } from 'output/entities/Regions';

@Controller('regions')
export class RegionsController {
  constructor(private Services: RegionsService) {}
  @Get()
  public async getAll() {
    return await this.Services.findAll();
  }
  @Get('/page')
  public async getPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit = 5,
  ): Promise<Pagination<Regions>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.findPage({
      page,
      limit,
    });
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
  }
  @Post()
  public async create(
    @Body()
    regionDetail: {
      regionName: string;
    },
  ) {
    return await this.Services.create(regionDetail);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    regionDetail: {
      regionName: string;
    },
  ) {
    return await this.Services.update(id, regionDetail);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
