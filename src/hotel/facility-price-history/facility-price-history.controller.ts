import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FacilityPriceHistoryService } from './facility-price-history.service';
import { CreateFacilityPriceHistoryDto } from './facility-price-history.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FacilityPriceHistory } from 'output/entities/FacilityPriceHistory';

@Controller('facility-price-history')
export class FacilityPriceHistoryController {
  constructor(private Services: FacilityPriceHistoryService) {}

  @Get('all/')
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('id') id: number,
  ): Promise<Pagination<FacilityPriceHistory>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.findAll(
      {
        page,
        limit,
      },
      id,
    );
  }

  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
  }
  @Post()
  public async create(
    @Body()
    createfaph: CreateFacilityPriceHistoryDto,
  ) {
    return await this.Services.create(createfaph);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
