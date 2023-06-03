import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceItems } from 'output/entities/PriceItems';
import { Repository } from 'typeorm';
import { CreatePriceItemsDto } from './price-items.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PriceItemsService {
  constructor(
    @InjectRepository(PriceItems)
    private serviceRepo: Repository<PriceItems>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find();
  }

  public async findPage(
    options: IPaginationOptions,
    type: string,
    name: string,
  ): Promise<Pagination<PriceItems>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.pritId', 'ASC')
      .where('c.pritType ilike :prittype', {
        prittype: `%${type}%`,
      })
      .andWhere('c.pritName ilike :pritname', {
        pritname: `%${name}%`,
      });
    return paginate<PriceItems>(queryBuilder, options);
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { pritId: id },
    });
  }

  public async create(masterDetail: CreatePriceItemsDto) {
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

  public async update(id: number, masterDetail: CreatePriceItemsDto) {
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
