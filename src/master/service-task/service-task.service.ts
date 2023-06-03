import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTask } from 'output/entities/ServiceTask';
import { Repository } from 'typeorm';
import { CreateServiceTaskDto } from './service-task.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ServiceTaskService {
  constructor(
    @InjectRepository(ServiceTask)
    private serviceRepo: Repository<ServiceTask>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find();
  }

  public async findPage(
    options: IPaginationOptions,
  ): Promise<Pagination<ServiceTask>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.setaId', 'ASC');
    return paginate<ServiceTask>(queryBuilder, options);
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { setaId: id },
    });
  }

  public async create(masterDetail: CreateServiceTaskDto) {
    try {
      const master = await this.serviceRepo.save({
        ...masterDetail,
      });
      return master;
    } catch (error) {
      return error.message;
    }
  }

  public async update(id: number, masterDetail: CreateServiceTaskDto) {
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
