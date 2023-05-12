import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Facilities } from 'output/entities/Facilities';
import { FacilityPriceHistory } from 'output/entities/FacilityPriceHistory';
import { Repository } from 'typeorm';

@Injectable()
export class FacilityPriceHistoryService {
  constructor(
    @InjectRepository(FacilityPriceHistory)
    private serviceRepo: Repository<FacilityPriceHistory>,
  ) {}

  public async findOne(id: number) {
    return await this.serviceRepo.find({
      order: { faphId: 'ASC' },
      where: { faphFaci: { faciId: id } },
    });
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
