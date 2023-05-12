import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceTask } from 'output/entities/ServiceTask';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceTaskService {
  constructor(
    @InjectRepository(ServiceTask)
    private serviceRepo: Repository<ServiceTask>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find();
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { setaId: id },
    });
  }

  public async create(masterDetail: { setaName: string; setSeq: number }) {
    try {
      const master = await this.serviceRepo.save({
        ...masterDetail,
      });
      return master;
    } catch (error) {
      return error.message;
    }
  }

  public async update(
    id: number,
    masterDetail: {
      setaName: string;
      setSeq: number;
    },
  ) {
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
