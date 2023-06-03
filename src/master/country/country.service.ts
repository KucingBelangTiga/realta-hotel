import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'output/entities/Country';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './country.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private serviceRepo: Repository<Country>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({ relations: { countryRegion: true } });
  }

  public async findPage(
    options: IPaginationOptions,
  ): Promise<Pagination<Country>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.countryId', 'ASC');
    return paginate<Country>(queryBuilder, options);
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { countryId: id },
    });
  }

  public async create(countryDetail: CreateCountryDto) {
    try {
      const country = await this.serviceRepo.save({
        ...countryDetail,
      });
      return country;
    } catch (error) {
      return error.message;
    }
  }

  public async update(id: number, countryDetail: CreateCountryDto) {
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
