import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facilities } from 'output/entities/Facilities';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facilities)
    private facilityRepo: Repository<Facilities>,
  ) {}

  public async listFacility() {
    try {
      const response = await this.facilityRepo.find();
      return response;
    } catch (error) {
      throw new Error(`ada kesalahan di list facility, ${error.message}`);
    }
  }
}
