import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'output/entities/Country';
import { Regions } from 'output/entities/Regions';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private serviceRepo: Repository<Country>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({ relations: { countryRegion: true } });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { countryId: id },
    });
  }

  public async create(countryDetail: {
    countryName: string;
    countryRegion: Regions;
  }) {
    try {
      const country = await this.serviceRepo.save({
        ...countryDetail,
      });
      return country;
    } catch (error) {
      return error.message;
    }
  }

  public async update(
    id: number,
    countryDetail: {
      countryName: string;
      countryRegion: Regions;
    },
  ) {
    try {
      const country = await this.serviceRepo.update(id, {
        ...countryDetail,
      });
      return country;
    } catch (error) {
      return error.message;
    }
  }

  public async delete(id: number) {
    try {
      const country = await this.serviceRepo.delete(id);
      return country;
    } catch (error) {
      return error.message;
    }
  }
}
