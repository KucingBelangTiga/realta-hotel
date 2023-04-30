import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facilities } from 'output/entities/Facilities';
import { FacilityPhoto } from 'output/entities/FacilityPhoto';
import { Repository } from 'typeorm';

@Injectable()
export class FacilityPhotosService {
  constructor(
    @InjectRepository(FacilityPhoto)
    private serviceRepo: Repository<FacilityPhoto>,
  ) {}

  public async findAll(id: number) {
    return await this.serviceRepo.find({
      where: { faphoFaci: { faciId: id } },
      relations: { faphoFaci: true },
    });
  }

  // public async findOne(id: number) {
  //   return await this.serviceRepo.findOne({
  //     where: { faphoId: id },
  //     relations: { faphoFaci: true },
  //   });
  // }

  public async findMany(id: number) {
    return await this.serviceRepo.find({
      where: { faphoFaci: { faciId: id } },
      relations: { faphoFaci: true },
    });
  }

  public async create(
    file: any,
    facilityPhotoDetail: {
      faphoPrimary: boolean;
      faphoFaci: Facilities;
    },
  ) {
    try {
      const hotels = await this.serviceRepo.save({
        ...facilityPhotoDetail,
        faphoThumbnailFilename: file.originalname,
        faphoPhotoFilename: file.originalname,
        faphoModifiedDate: new Date(),
      });
      return hotels;
    } catch (error) {
      return error.message;
    }
  }

  public async update(
    id: number,
    file: any,
    facilityPhotoDetail: {
      faphoPrimary: boolean;
      faphoFaci: Facilities;
    },
  ) {
    try {
      const hotels = await this.serviceRepo.update(id, {
        ...facilityPhotoDetail,
        faphoThumbnailFilename: file.originalname,
        faphoPhotoFilename: file.originalname,
        faphoModifiedDate: new Date(),
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
