import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entitys } from 'output/entities/Entitys';

@Injectable()
export class EntitysService {
  constructor(
    @InjectRepository(Entitys) private serviceRepo: Repository<Entitys>,
  ) {}
  public async getEntitys() {
    return await this.serviceRepo.find();
  }

  public async getEntityById(id: number) {
    return await this.serviceRepo.findOne({
      where: { entityId: id },
    });
  }

  public async addEntity(entityId: number) {
    try {
      const entity = await this.serviceRepo.save({
        entityId: entityId,
      });
      return entity;
    } catch (error) {
      return error.message;
    }
  }

  public async updateEntity(id: number, entityId: number) {
    try {
      const entity = await this.serviceRepo.update(id, {
        entityId: entityId,
      });
      return entity;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteEntity(id: number) {
    try {
      const entity = await this.serviceRepo.delete(id);
      return entity;
    } catch (error) {
      return error.message;
    }
  }
}
