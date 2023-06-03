import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FacilityPriceHistory } from 'output/entities/FacilityPriceHistory';
import { Repository } from 'typeorm';
import { CreateFacilityPriceHistoryDto } from './facility-price-history.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class FacilityPriceHistoryService {
  constructor(
    @InjectRepository(FacilityPriceHistory)
    private serviceRepo: Repository<FacilityPriceHistory>,
  ) {}

  public async findAll(
    options: IPaginationOptions,
    id: number,
  ): Promise<Pagination<FacilityPriceHistory>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.faphId', 'ASC')
      .innerJoinAndSelect('c.faphFaci', 'faphFaci')
      .where('faphFaci.faciId = :faciId', {
        faciId: id,
      });
    return paginate<FacilityPriceHistory>(queryBuilder, options);
  }

  public async findOne(id: number) {
    return await this.serviceRepo.find({
      order: { faphId: 'ASC' },
      where: { faphFaci: { faciId: id } },
    });
  }

  public async create(faphlitiesDetail: CreateFacilityPriceHistoryDto) {
    try {
      const hotels = await this.serviceRepo.save(faphlitiesDetail);
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
