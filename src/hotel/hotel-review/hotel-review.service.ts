import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelReviews } from 'output/entities/HotelReviews';
import { Hotels } from 'output/entities/Hotels';
import { Repository } from 'typeorm';

@Injectable()
export class HotelReviewService {
  constructor(
    @InjectRepository(HotelReviews)
    private serviceRepo: Repository<HotelReviews>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({
      relations: { horeHotel: true },
    });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { horeId: id },
      relations: { horeHotel: true },
    });
  }

  public async create(hotelReviewDetail: {
    horeUserReview: string;
    horeRating: number;
    horeUserId: number;
    horeHotel: Hotels;
  }) {
    try {
      const hotels = await this.serviceRepo.save({
        ...hotelReviewDetail,
        horeCreatedOn: new Date(),
      });
      return hotels;
    } catch (error) {
      return error.message;
    }
  }

  public async update(
    id: number,
    hotelReviewDetail: {
      horeUserReview: string;
      horeRating: number;
      horeUserId: number;
      horeHotel: Hotels;
    },
  ) {
    try {
      const hotels = await this.serviceRepo.update(id, {
        ...hotelReviewDetail,
      });
      return hotels;
    } catch (error) {
      return error.message;
    }
  }

  public async delete(id: number) {
    try {
      const hotels = await this.serviceRepo.delete(id);
      return hotels;
    } catch (error) {
      return error.message;
    }
  }
}
