import {
  Controller,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { CreateHotelsDto } from './hotels.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Hotels } from 'output/entities/Hotels';

@Controller('hotels')
export class HotelsController {
  constructor(private Services: HotelsService) {}

  @Get('all/')
  public async getAllData(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('name') name: string,
  ): Promise<Pagination<Hotels>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.findAllData(
      {
        page,
        limit,
      },
      name,
    );
  }

  @Get('')
  public async getAll() {
    return await this.Services.findAll();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
  }
  @Post()
  public async create(
    @Body()
    createHotelsDto: CreateHotelsDto,
  ) {
    return await this.Services.create(createHotelsDto);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    createHotelsDto: CreateHotelsDto,
  ) {
    return await this.Services.update(id, createHotelsDto);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
