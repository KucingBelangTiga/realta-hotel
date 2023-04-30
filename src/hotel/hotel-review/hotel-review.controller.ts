import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HotelReviewService } from './hotel-review.service';
import { Hotels } from 'output/entities/Hotels';

@Controller('hotel-review')
export class HotelReviewController {
  constructor(private Services: HotelReviewService) {}
  @Get()
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
    createHotelReview: {
      horeUserReview: string;
      horeRating: number;
      horeUserId: number;
      horeHotel: Hotels;
    },
  ) {
    return await this.Services.create(createHotelReview);
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body()
    createHotelReview: {
      horeUserReview: string;
      horeRating: number;
      horeUserId: number;
      horeHotel: Hotels;
    },
  ) {
    return await this.Services.update(id, createHotelReview);
  }
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.Services.delete(id);
  }
}
