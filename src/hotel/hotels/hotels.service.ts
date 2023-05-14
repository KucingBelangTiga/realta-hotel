import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Address } from 'output/entities/Address';
import { Hotels } from 'output/entities/Hotels';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotels)
    private serviceRepo: Repository<Hotels>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({
      relations: { hotelAddr: true },
      order: { hotelId: 'ASC' },
    });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { hotelId: id },
      relations: { hotelAddr: true },
    });
  }

  public async create(hotelDetail: {
    hotelName: string;
    hotelDescription: string;
    hotelRatingStar: number;
    hotelPhonenumber: string;
    hotelAddr: Address;
  }) {
    try {
      const hotels = await this.serviceRepo.save({
        ...hotelDetail,
        hotelModifiedDate: new Date(),
      });
      return hotels;
    } catch (error) {
      return error.message;
    }
  }

  public async update(
    id: number,
    hotelDetail: {
      hotelName: string;
      hotelDescription: string;
      hotelRatingStar: number;
      hotelPhonenumber: string;
      hotelAddr: Address;
    },
  ) {
    try {
      const hotels = await this.serviceRepo.update(id, {
        ...hotelDetail,
        hotelModifiedDate: new Date(),
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
