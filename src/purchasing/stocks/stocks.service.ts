import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stocks } from 'output/entities/Stocks';
import { Repository } from 'typeorm';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stocks) private stockRepo: Repository<Stocks>,
  ) {}

  public async listStock(page: number) {
    try {
      const limit = 10;
      const [data, total] = await this.stockRepo
        .createQueryBuilder('stock')
        .select()
        .orderBy('stock.stockId', 'ASC')
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
      return { data, total };
    } catch (error) {
      throw new Error(`terjadi kesalahan di list stock, ${error.message}`);
    }
  }

  public async listAllStock() {
    try {
      const response = await this.stockRepo
        .createQueryBuilder('stock')
        .select()
        .getMany();
      return response;
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di findByName stock, ${error.message}`,
      );
    }
  }

  public async createStock(
    stockName: string,
    stockDescription: string,
    stockQuantity: number,
    stockReorderPoint: number,
    stockUsed: number,
    stockScrap: number,
    stockSize: string,
    stockColor: string,
  ) {
    try {
      const response = await this.stockRepo.save({
        stockName: stockName,
        stockDescription: stockDescription,
        stockQuantity: stockQuantity,
        stockReorderPoint: stockReorderPoint,
        stockUsed: stockUsed,
        stockScrap: stockScrap,
        stockSize: stockSize,
        stockColor: stockColor,
      });
      return response;
    } catch (error) {
      throw new Error(`terjadi kesalahan di create stock, ${error.message}`);
    }
  }

  public async editStock(
    stockName: string,
    stockDescription: string,
    stockQuantity: number,
    stockReorderPoint: number,
    stockUsed: number,
    stockScrap: number,
    stockSize: string,
    stockColor: string,
    stockId: number,
  ) {
    try {
      await this.stockRepo.update(
        { stockId: stockId },
        {
          stockName: stockName,
          stockDescription: stockDescription,
          stockQuantity: stockQuantity,
          stockReorderPoint: stockReorderPoint,
          stockUsed: stockUsed,
          stockScrap: stockScrap,
          stockSize: stockSize,
          stockColor: stockColor,
        },
      );
      return {
        statusCode: 200,
        message: 'berhasil edit data',
        data: {
          stockId: stockId,
          stockName: stockName,
          stockDescription: stockDescription,
          stockQuantity: stockQuantity,
          stockReorderPoint: stockReorderPoint,
          stockUsed: stockUsed,
          stockScrap: stockScrap,
          stockSize: stockSize,
          stockColor: stockColor,
        },
      };
    } catch (error) {
      throw new Error(`terjadi kesalahan di edit stock, ${error.message}`);
    }
  }

  public async deleteStock(stockId: number) {
    try {
      await this.stockRepo.delete(stockId);
      return {
        statusCode: 200,
        message: 'berhasil hapus data',
        data: {
          stockId: stockId,
        },
      };
    } catch (error) {
      throw new Error(`terjadi kesalahan di edit stock, ${error.message}`);
    }
  }

  public async galleryStockPurchase(page: number) {
    try {
      const data = await this.stockRepo
        .createQueryBuilder('s')
        .select(
          's.stockId, sp.sphoPhotoFilename, s.stockName, s.stockDescription, vp.veproQtyStocked, s.stockReorderPoint, vp.veproPrice, v.vendorId, v.vendorName',
        )
        .leftJoin('s.vendorProducts', 'vp')
        .leftJoin('vp.veproVendor', 'v')
        .leftJoin('s.stockPhotos', 'sp', 'sp.sphoPrimary = 1')
        .offset((page - 1) * 8)
        .limit(8)
        .getRawMany();

      const total = await this.stockRepo.createQueryBuilder('pode').getCount();
      return { data, total };
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di list stock purchase, ${error.message}`,
      );
    }
  }

  public async searchGalleryStockPurchase(stockName: string) {
    try {
      const response = await this.stockRepo
        .createQueryBuilder('s')
        .select(
          'sp.sphoUrl, s.stockName, s.stockDescription, vp.veproQtyStocked, vp.veproQtyRemaining, vp.veproPrice, vp.veproVendor.vendorId',
        )
        .innerJoin('s.vendorProducts', 'vp')
        .innerJoin('s.stockPhotos', 'sp')
        .where('LOWER(s.stockName) Like LOWER(:stockName)', {
          stockName: `%${stockName.toLowerCase()}%`,
        })
        .getRawMany();
      return response;
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di list stock purchase, ${error.message}`,
      );
    }
  }

  public async searchGalleryStockPurchaseById(stockId: number) {
    try {
      const response = await this.stockRepo
        .createQueryBuilder('s')
        .select(
          'sp.sphoUrl, s.stockName, s.stockDescription, vp.veproQtyStocked, vp.veproQtyRemaining, vp.veproPrice, vp.veproVendor.vendorId',
        )
        .innerJoin('s.vendorProducts', 'vp')
        .innerJoin('s.stockPhotos', 'sp')
        .where('s.stockId = :stockId', { stockId })
        .getRawMany();
      return response;
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di list stock purchase, ${error.message}`,
      );
    }
  }
}
