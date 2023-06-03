import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proviences } from 'output/entities/Proviences';
import { Repository } from 'typeorm';
import { CreateProvinceDto } from './provinces.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Proviences)
    private serviceRepo: Repository<Proviences>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({ relations: { provCountry: true } });
  }

  public async findPage(
    options: IPaginationOptions,
  ): Promise<Pagination<Proviences>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.provId', 'ASC');
    return paginate<Proviences>(queryBuilder, options);
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { provId: id },
    });
  }

  public async create(masterDetail: CreateProvinceDto) {
    try {
      const master = await this.serviceRepo.save({
        ...masterDetail,
      });
      return master;
    } catch (error) {
      return error.message;
    }
  }

  public async update(id: number, masterDetail: CreateProvinceDto) {
    try {
      const master = await this.serviceRepo.update(id, {
        ...masterDetail,
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
