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

  public async listStockPhoto() {
    try {
      const response = await this.stockPhotoRepo.find();
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

  public async updateStockPhoto(sphoId: number, sphoPrimary: number) {
    try {
      const response = await this.stockPhotoRepo.update(
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
