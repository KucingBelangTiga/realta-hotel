import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Address } from 'output/entities/Address';
import { Hotels } from 'output/entities/Hotels';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotels)
    private serviceRepo: Repository<Hotels>,
  ) {}

  public async findAllData(
    options: IPaginationOptions,
    name: string,
  ): Promise<Pagination<Hotels>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.hotelId', 'ASC')
      .where('c.hotelName ilike :hotelname', {
        hotelname: `%${name}%`,
      });
    return paginate<Hotels>(queryBuilder, options);
  }

  public async findAll(page: number) {
    const currentPage = page * 5 - 5;
    return await this.serviceRepo.find({
      relations: { hotelAddr: true },
      order: { hotelId: 'ASC' },
      take: page - 1 < 0 ? 0 : 5,
      skip: currentPage - 5 < 0 ? 0 : currentPage,
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
