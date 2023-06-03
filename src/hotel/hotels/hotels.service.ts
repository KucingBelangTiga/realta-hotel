import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Hotels } from 'output/entities/Hotels';
import { Repository } from 'typeorm';
import { CreateHotelsDto } from './hotels.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

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
      .innerJoinAndSelect('c.hotelAddr', 'hotelAddr')
      .where('c.hotelName ilike :hotelname', {
        hotelname: `%${name}%`,
      });
    return paginate<Hotels>(queryBuilder, options);
  }

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

  public async create(createHotelsDto: CreateHotelsDto) {
    try {
      const hotels = await this.serviceRepo.save(createHotelsDto);
      return hotels;
    } catch (error) {
      return error.message;
    }
  }

  public async update(id: number, createHotelsDto: CreateHotelsDto) {
    try {
      const hotels = await this.serviceRepo.update(id, createHotelsDto);
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
