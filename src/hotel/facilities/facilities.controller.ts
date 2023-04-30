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
import { FacilitiesService } from './facilities.service';
import { CategoryGroup } from 'output/entities/CategoryGroup';
import { Hotels } from 'output/entities/Hotels';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Facilities } from 'output/entities/Facilities';

@Controller('facilities')
export class FacilitiesController {
  constructor(private Services: FacilitiesService) {}
  @Get()
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('id') id: number,
  ): Promise<Pagination<Facilities>> {
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
      faciCargo: CategoryGroup;
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
      faciCargo: CategoryGroup;
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
