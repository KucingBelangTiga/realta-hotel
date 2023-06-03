import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Regions } from 'output/entities/Regions';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Regions)
    private serviceRepo: Repository<Regions>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({ order: { regionCode: 'ASC' } });
  }

  public async findPage(
    options: IPaginationOptions,
  ): Promise<Pagination<Regions>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.regionCode', 'ASC');
    return paginate<Regions>(queryBuilder, options);
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { regionCode: id },
    });
  }

  public async create(regionDetail: { regionName: string }) {
    try {
      const region = await this.serviceRepo.save({
        ...regionDetail,
      });
      return region;
    } catch (error) {
      return error.message;
    }
  }

  public async update(
    id: number,
    regionDetail: {
      regionName: string;
    },
  ) {
    try {
      const region = await this.serviceRepo.update(id, {
        ...regionDetail,
      });
      return region;
    } catch (error) {
      return error.message;
    }
  }

  public async delete(id: number) {
    try {
      const region = await this.serviceRepo.delete(id);
      return region;
    } catch (error) {
      return error.message;
    }
  }
}
