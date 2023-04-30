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
import { Facilities } from 'output/entities/Facilities';
import { FacilityPriceHistory } from 'output/entities/FacilityPriceHistory';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('facility-price-history')
export class FacilityPriceHistoryController {
  constructor(private Services: FacilityPriceHistoryService) {}
  @Get('')
  public async getOne(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('id') id: number,
  ): Promise<Pagination<FacilityPriceHistory>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.findOne(
      {
        page,
        limit,
      },
      id,
    );
  }
  @Post()
  public async create(
    @Body()
    createfaph: {
      faphStartdate: Date;
      faphEnddate: Date;
      faphLowPrice: string;
      faphHighPrice: string;
      faphRatePrice: string;
      faphDiscount: string;
      faphTaxRate: string;
      faphUserId: number;
      faphFaci: Facilities;
    },
  ) {
    return await this.Services.create(createfaph);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
