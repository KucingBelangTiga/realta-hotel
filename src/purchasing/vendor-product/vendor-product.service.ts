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

  public async findByIdVendor(vendorId: number, page: number) {
    try {
      const data = await this.vendorProductRepo
        .createQueryBuilder('vp')
        .select(
          'v.vendorId as vendorId, vp.veproId as veproId, s.stockName as stockName, vp.veproQtyStocked as veproQtyStocked, vp.veproQtyRemaining as veproQtyRemaining, vp.veproPrice as veproPrice, s.stockId as stockId',
        )
        .innerJoin('vp.veproStock', 's')
        .innerJoin('vp.veproVendor', 'v')
        .where('v.vendorId = :vendorId', { vendorId })
        .offset((page - 1) * 10)
        .limit(10)
        .getRawMany();
      const total = await this.vendorProductRepo
        .createQueryBuilder('vp')
        .where('vp.veproVendor = :vendorId', { vendorId })
        .getCount();
      return { data, total };
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
    stockId: number,
  ) {
    try {
      await this.vendorProductRepo.update(
        { veproId: veproId },
        {
          veproQtyStocked: veproQtyStocked,
          veproQtyRemaining: veproQtyRemaining,
          veproPrice: veproPrice,
          veproStock: { stockId: stockId },
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
          stockId: stockId,
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
