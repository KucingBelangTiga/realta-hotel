import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'output/entities/Country';
import { Proviences } from 'output/entities/Proviences';
import { Repository } from 'typeorm';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Proviences)
    private serviceRepo: Repository<Proviences>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({ relations: { provCountry: true } });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { provId: id },
    });
  }

  public async create(masterDetail: {
    provName: string;
    provCountry: Country;
  }) {
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
      provName: string;
      provCountry: Country;
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
