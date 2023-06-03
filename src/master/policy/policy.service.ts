import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Policy } from 'output/entities/Policy';
import { Repository } from 'typeorm';
import { CreatePolicyDto } from './policy.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private serviceRepo: Repository<Policy>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find();
  }

  public async findPage(
    options: IPaginationOptions,
  ): Promise<Pagination<Policy>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.poliId', 'ASC');
    return paginate<Policy>(queryBuilder, options);
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { poliId: id },
    });
  }

  public async create(masterDetail: CreatePolicyDto) {
    try {
      const master = await this.serviceRepo.save({
        ...masterDetail,
      });
      return master;
    } catch (error) {
      return error.message;
    }
  }

  public async update(id: number, masterDetail: CreatePolicyDto) {
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
