import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FacilityPriceHistoryService } from './facility-price-history.service';
import { Facilities } from 'output/entities/Facilities';

@Controller('facility-price-history')
export class FacilityPriceHistoryController {
  constructor(private Services: FacilityPriceHistoryService) {}
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
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
