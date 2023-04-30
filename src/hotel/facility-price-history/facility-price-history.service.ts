import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Facilities } from 'output/entities/Facilities';
import { FacilityPriceHistory } from 'output/entities/FacilityPriceHistory';
import { Repository } from 'typeorm';

@Injectable()
export class FacilityPriceHistoryService {
  constructor(
    @InjectRepository(FacilityPriceHistory)
    private serviceRepo: Repository<FacilityPriceHistory>,
  ) {}

  public async findOne(
    options: IPaginationOptions,
    id: number,
  ): Promise<Pagination<FacilityPriceHistory>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.faphId', 'ASC')
      .innerJoinAndSelect('c.faphFaci', 'faphFaci')
      .where('faphFaci.faciId = :faciid', {
        faciid: id,
      });
    return paginate<FacilityPriceHistory>(queryBuilder, options);
  }

  public async create(faphlitiesDetail: {
    faphStartdate: Date;
    faphEnddate: Date;
    faphLowPrice: string;
    faphHighPrice: string;
    faphRatePrice: string;
    faphDiscount: string;
    faphTaxRate: string;
    faphUserId: number;
    faphFaci: Facilities;
  }) {
    try {
      const hotels = await this.serviceRepo.save({
        ...faphlitiesDetail,
        faphModifiedDate: new Date(),
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
