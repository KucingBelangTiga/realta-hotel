import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceItems } from 'output/entities/PriceItems';
import { Repository } from 'typeorm';

@Injectable()
export class PriceItemsService {
  constructor(
    @InjectRepository(PriceItems)
    private serviceRepo: Repository<PriceItems>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find();
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { pritId: id },
    });
  }

  public async create(masterDetail: {
    pritName: string;
    pritPrice: string;
    pritDescription: string;
    pritType: string;
  }) {
    try {
      const master = await this.serviceRepo.save({
        ...masterDetail,
        pritModifiedDate: new Date(),
      });
      return master;
    } catch (error) {
      return error.message;
    }
  }

  public async update(
    id: number,
    masterDetail: {
      pritName: string;
      pritPrice: string;
      pritDescription: string;
      pritType: string;
    },
  ) {
    try {
      const master = await this.serviceRepo.update(id, {
        ...masterDetail,
        pritModifiedDate: new Date(),
      });
      return master;
    } catch (error) {
      return error.message;
    }
  }

  public async delete(id: number) {
    try {
      const master = await this.serviceRepo.delete(id);
      return master;
    } catch (error) {
      return error.message;
    }
  }
}
