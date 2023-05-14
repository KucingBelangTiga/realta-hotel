import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'output/entities/Address';
import { Proviences } from 'output/entities/Proviences';
import { Repository } from 'typeorm';

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
    return await this.serviceRepo.find();
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { addrId: id },
      relations: { addrProv: { provCountry: { countryRegion: true } } },
    });
  }

  public async create(masterDetail: {
    addrLine1: string;
    addrLine2: string;
    addrPostalCode: string;
    addrProv: Proviences;
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
      addrLine1: string;
      addrLine2: string;
      addrPostalCode: string;
      addrProv: Proviences;
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
