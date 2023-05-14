import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from 'output/entities/Vendor';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>,
  ) {}

  public async listVendor() {
    try {
      const response = await this.vendorRepo
        .createQueryBuilder('vendor')
        .select()
        .orderBy('vendor.vendorId', 'ASC')
        .getMany();
      return response;
    } catch (error) {
      throw new Error(`ada kesalahan di list vendor, ${error.message}`);
    }
  }

  public async findVendorByName(vendorName: string) {
    try {
      const response = await this.vendorRepo
        .createQueryBuilder('Vendor')
        .select()
        .where('LOWER(Vendor.vendorName) Like LOWER(:vendorName)', {
          vendorName: `%${vendorName.toLowerCase()}%`,
        })
        .getMany();
      if (response.length === 0) {
        return {
          statusCode: 401,
          message: 'tidak ditemukan vendor',
        };
      } else {
        return response;
      }
    } catch (error) {
      throw new Error(`ada kesalahan di findByName vendor, ${error.message}`);
    }
  }

  public async findVendorById(vendorId: number) {
    try {
      const response = await this.vendorRepo.findOne({
        where: { vendorId: vendorId },
      });
      return response;
    } catch (error) {
      throw new Error(`ada kesalahan di findById vendor, ${error.message}`);
    }
  }

  public async createVendor(
    vendorName: string,
    vendorActive: number,
    vendorPriority: number,
    vendorRegisterDate: any,
    vendorWeburl: string,
  ) {
    try {
      const response = await this.vendorRepo.save({
        vendorName: vendorName,
        vendorActive: vendorActive,
        vendorPriority: vendorPriority,
        vendorRegisterDate: vendorRegisterDate,
        vendorWeburl: vendorWeburl,
      });
      return response;
    } catch (error) {
      throw new Error(`ada kesalahan di create vendor, ${error.message}`);
    }
  }

  public async editVendor(
    vendorId: number,
    vendorName: string,
    vendorActive: number,
    vendorPriority: number,
    vendorWeburl: string,
  ) {
    try {
      await this.vendorRepo.update(
        { vendorId: vendorId },
        {
          vendorName: vendorName,
          vendorActive: vendorActive,
          vendorPriority: vendorPriority,
          vendorWeburl: vendorWeburl,
        },
      );
      return {
        statusCode: 200,
        message: 'sukses edit',
        data: {
          vendorId: vendorId,
          vendorName: vendorName,
          vendorActive: vendorActive,
          vendorPriority: vendorPriority,
          vendorWeburl: vendorWeburl,
        },
      };
    } catch (error) {
      throw new Error(`ada kesalahan di edit vendor, ${error.message}`);
    }
  }

  public async deleteVendor(vendorId: number) {
    try {
      await this.vendorRepo.delete(vendorId);
      return {
        statusCode: 200,
        message: 'sukses delete',
        data: {
          vendorId: vendorId,
        },
      };
    } catch (error) {
      throw new Error(`ada kesalahan di edit vendor, ${error.message}`);
    }
  }
}
