import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryGroup } from 'output/entities/CategoryGroup';
import { Facilities } from 'output/entities/Facilities';
import { Hotels } from 'output/entities/Hotels';
import { Repository } from 'typeorm';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facilities)
    private serviceRepo: Repository<Facilities>,
  ) {}

  // public async findAll(
  //   options: IPaginationOptions,
  //   id: number,
  // ): Promise<Pagination<Facilities>> {
  //   const queryBuilder = this.serviceRepo
  //     .createQueryBuilder('c')
  //     .orderBy('c.faciId', 'ASC')
  //     .innerJoinAndSelect('c.faciHotel', 'faciHotel')
  //     .innerJoinAndSelect('c.faciCagro', 'faciCagro')
  //     .where('faciHotel.hotelId = :hotelid', {
  //       hotelid: id,
  //     });
  //   return paginate<Facilities>(queryBuilder, options);
  // }

  public async findAll(id: number) {
    return await this.serviceRepo.find({
      order: { faciId: 'ASC' },
      where: { faciHotel: { hotelId: id } },
    });
  }

  public async findOne(id: number) {
    return await this.serviceRepo.findOne({
      where: { faciId: id },
      relations: { faciCagro: true, faciHotel: true },
    });
  }

  public async create(facilitiesDetail: {
    faciName: string;
    faciDescription: string;
    faciMaxNumber: number;
    faciMeasureUnit: string;
    faciRoomNumber: string;
    faciStartdate: Date;
    faciEnddate: Date;
    faciLowPrice: string;
    faciHighPrice: string;
    faciRatePrice: string;
    faciDiscount: string;
    faciTaxRate: string;
    faciCargo: CategoryGroup;
    faciHotel: Hotels;
  }) {
    try {
      const hotels = await this.serviceRepo.save({
        ...facilitiesDetail,
        faciModifiedDate: new Date(),
      });
      return hotels;
    } catch (error) {
      return error.message;
    }
  }

  public async update(
    id: number,
    facilitiesDetail: {
      faciName: string;
      faciDescription: string;
      faciMaxNumber: number;
      faciMeasureUnit: string;
      faciRoomNumber: string;
      faciStartdate: Date;
      faciEnddate: Date;
      faciLowPrice: string;
      faciHighPrice: string;
      faciRatePrice: string;
      faciDiscount: string;
      faciTaxRate: string;
      faciCargo: CategoryGroup;
      faciHotel: Hotels;
    },
  ) {
    try {
      const hotels = await this.serviceRepo.update(id, {
        ...facilitiesDetail,
        faciModifiedDate: new Date(),
      });
      return hotels;
    } catch (error) {
      return error.message;
    }
  }

  public async delete(id: number) {
    try {
      const hotels = await this.serviceRepo.delete(id);
      return hotels;
    } catch (error) {
      return error.message;
    }
  }
}
