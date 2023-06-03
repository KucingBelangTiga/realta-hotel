import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'output/entities/Address';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './address.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private serviceRepo: Repository<Address>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find({
      relations: { addrProv: true },
      order: { addrId: 'ASC' },
    });
  }

  public async findPage(
    options: IPaginationOptions,
  ): Promise<Pagination<Address>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.addrId', 'ASC');
    return paginate<Address>(queryBuilder, options);
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { addrId: id },
      relations: { addrProv: { provCountry: { countryRegion: true } } },
    });
  }

  public async create(masterDetail: CreateAddressDto) {
    try {
      const master = await this.serviceRepo.save({
        ...masterDetail,
      });
      return master;
    } catch (error) {
      return error.message;
    }
  }

  public async update(id: number, masterDetail: CreateAddressDto) {
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
