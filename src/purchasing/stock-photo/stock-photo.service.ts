import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockPhoto } from 'output/entities/StockPhoto';
import { Repository } from 'typeorm';

@Injectable()
export class StockPhotoService {
  constructor(
    @InjectRepository(StockPhoto)
    private stockPhotoRepo: Repository<StockPhoto>,
  ) {}

  public async listStockPhoto(stockId: number) {
    try {
      const response = await this.stockPhotoRepo
        .createQueryBuilder('sp')
        .select()
        .where('sp.sphoStock.stockId=:stockId', { stockId })
        .orderBy('sp.sphoPrimary', 'DESC')
        .getRawMany();
      return response;
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di list stock photo, ${error.message}`,
      );
    }
  }

  public async createStockPhoto(
    file: any,
    sphoPrimary: number,
    stockId: number,
  ) {
    try {
      const response = await this.stockPhotoRepo.save({
        sphoThumbnailFilename: file.originalname,
        sphoPhotoFilename: file.originalname,
        sphoPrimary: sphoPrimary,
        sphoUrl: file.path,
        sphoStock: { stockId: stockId },
      });
      return response;
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di create stock photo, ${error.message}`,
      );
    }
  }

  public async updateStockPhoto(
    sphoId: number,
    sphoPrimary: number,
    stockId: number,
  ) {
    try {
      await this.stockPhotoRepo.update(
        { sphoStock: { stockId: stockId } },
        { sphoPrimary: 0 },
      );

      await this.stockPhotoRepo.update(
        { sphoId: sphoId },
        {
          sphoPrimary: sphoPrimary,
        },
      );
      return {
        statusCode: 200,
        message: 'sukses edit primary',
        data: {
          sphoId: sphoId,
          sphoPrimary: sphoPrimary,
        },
      };
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di edit stock photo, ${error.message}`,
      );
    }
  }

  public async deleteStockPhoto(sphoId: number) {
    try {
      await this.stockPhotoRepo.delete(sphoId);
      return {
        statusCode: 200,
        message: 'sukses delete primary',
        data: {
          sphoId: sphoId,
        },
      };
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di edit stock photo, ${error.message}`,
      );
    }
  }
}
