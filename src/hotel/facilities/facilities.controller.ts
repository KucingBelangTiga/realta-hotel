import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CategoryGroup } from 'output/entities/CategoryGroup';
import { Hotels } from 'output/entities/Hotels';

@Controller('facilities')
export class FacilitiesController {
  constructor(private Services: FacilitiesService) {}
  @Get('all/:id')
  public async getAll(@Param('id') id: number) {
    return await this.Services.findAll(id);
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.findOne(id);
  }
  @Post()
  public async create(
    @Body()
    createFacilities: {
      faciName: string;
      faciDescription: string;
      faciMaxNumber: number;
      faciMeasureUnit: string;
      faciRoomNumber: string;
      faciStartdate: Date;
      faciEnddate: Date;
      faciLowPrice: string;
      faciHighPrice: string;
      faciRatePrice: string;
      faciDiscount: string;
      faciTaxRate: string;
      faciCagro: CategoryGroup;
      faciHotel: Hotels;
    },
  ) {
    return await this.Services.create(createFacilities);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    createFacilities: {
      faciName: string;
      faciDescription: string;
      faciMaxNumber: number;
      faciMeasureUnit: string;
      faciRoomNumber: string;
      faciStartdate: Date;
      faciEnddate: Date;
      faciLowPrice: string;
      faciHighPrice: string;
      faciRatePrice: string;
      faciDiscount: string;
      faciTaxRate: string;
      faciCagro: CategoryGroup;
      faciHotel: Hotels;
    },
  ) {
    return await this.Services.update(id, createFacilities);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
