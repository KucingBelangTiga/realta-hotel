import { Controller } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Address } from 'output/entities/Address';
import { Delete } from '@nestjs/common';

@Controller('hotels')
export class HotelsController {
  constructor(private Services: HotelsService) {}

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
    createHotel: {
      hotelName: string;
      hotelDescription: string;
      hotelRatingStar: number;
      hotelPhonenumber: string;
      hotelAddr: Address;
    },
  ) {
    return await this.Services.create(createHotel);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    createHotel: {
      hotelName: string;
      hotelDescription: string;
      hotelRatingStar: number;
      hotelPhonenumber: string;
      hotelAddr: Address;
    },
  ) {
    return await this.Services.update(id, createHotel);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
