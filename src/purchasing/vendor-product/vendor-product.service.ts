import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorProduct } from 'output/entities/VendorProduct';
import { Repository } from 'typeorm';

@Injectable()
export class VendorProductService {
  constructor(
    @InjectRepository(VendorProduct)
    private vendorProductRepo: Repository<VendorProduct>,
  ) {}

  public async findByIdVendor(vendorId: number) {
    try {
      const response = await this.vendorProductRepo
        .createQueryBuilder('vp')
        .select(
          'vp.veproId, s.stockName, vp.veproQtyStocked, vp.veproQtyRemaining, vp.veproPrice',
        )
        .innerJoin('vp.veproStock', 's')
        .where('vp.veproVendor.vendorId = :vendorId', { vendorId })
        .getRawMany();
      if (response.length === 0) {
        return {
          statusCode: 404,
          message: 'vendor product tidak ditemukan',
        };
      } else {
        return response;
      }
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di findById vendor product, ${error.message}`,
      );
    }
  }

  public async createVendorProduct(
    veproQtyStocked: number,
    veproQtyRemaining: number,
    veproPrice: string,
    vendorId: number,
    stockId: number,
  ) {
    try {
      const response = await this.vendorProductRepo.save({
        veproQtyStocked: veproQtyStocked,
        veproQtyRemaining: veproQtyRemaining,
        veproPrice: veproPrice,
        veproVendor: { vendorId: vendorId },
        veproStock: { stockId: stockId },
      });
      return response;
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di create vendor product, ${error.message}`,
      );
    }
  }

  public async editVendorProduct(
    veproQtyStocked: number,
    veproQtyRemaining: number,
    veproPrice: string,
    veproId: number,
  ) {
    try {
      await this.vendorProductRepo.update(
        { veproId: veproId },
        {
          veproQtyStocked: veproQtyStocked,
          veproQtyRemaining: veproQtyRemaining,
          veproPrice: veproPrice,
        },
      );
      return {
        statusCode: 200,
        message: 'berhasil di edit',
        data: {
          veproId: veproId,
          veproQtyStocked: veproQtyStocked,
          veproQtyRemaining: veproQtyRemaining,
          veproPrice: veproPrice,
        },
      };
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di edit vendor product, ${error.message}`,
      );
    }
  }

  public async deleteVendorProduct(veproId: number) {
    try {
      await this.vendorProductRepo.delete(veproId);
      return {
        statusCode: 200,
        message: 'berhasil menghapus',
        data: {
          veproId: veproId,
        },
      };
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di delete vendor product, ${error.message}`,
      );
    }
  }
}

