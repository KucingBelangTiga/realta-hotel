import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockDetail } from 'output/entities/StockDetail';
import { Repository } from 'typeorm';

@Injectable()
export class StockDetailService {
  constructor(
    @InjectRepository(StockDetail)
    private stockDetailRepo: Repository<StockDetail>,
  ) {}

  public async findStockDetaiById(stockId: number) {
    try {
      const response = await this.stockDetailRepo
        .createQueryBuilder('sd')
        .select(
          'sd.stodId, sd.stodBarcodeNumber, sd.stodStatus, sd.stodNotes, po.poheNumber, f.faciName',
        )
        .innerJoin('sd.stodPohe', 'po')
        .innerJoin('sd.stodFaci', 'f')
        .where('sd.stodStock.stockId=:stockId', { stockId })
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
        `terjadi kesalahan di findById stock detail, ${error.message}`,
      );
    }
  }

  public async createStockDetail(
    stockId: number,
    stodStatus: string,
    stodBarcodeNumber: string,
    stodNotes: string,
    poheId: number,
    faciId: number,
  ) {
    try {
      const response = await this.stockDetailRepo.save({
        stodStock: { stockId: stockId },
        stodBarcodeNumber: stodBarcodeNumber,
        stodStatus: stodStatus,
        stodNotes: stodNotes,
        stodPohe: { poheId: poheId },
        stodFaci: { faciId: faciId },
      });
      return response;
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di create stock detail, ${error.message}`,
      );
    }
  }

  public async editStockDetail(
    stodId: number,
    stockId: number,
    stodStatus: string,
    faciId: number,
  ) {
    try {
      await this.stockDetailRepo.update(
        { stodId: stodId, stodStockId: stockId },
        {
          stodStatus: stodStatus,
          stodFaci: { faciId: faciId },
        },
      );
      return {
        codeStatus: 200,
        message: 'berhasil update data',
        data: {
          stodId: stodId,
          stockId: stockId,
          stodStatus: stodStatus,
          faciId: faciId,
        },
      };
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di edit stock detail, ${error.message}`,
      );
    }
  }

  public async deleteStockDetail(stodId: number, stockId: number) {
    try {
      await this.stockDetailRepo.delete({
        stodId: stodId,
        stodStockId: stockId,
      });
      return {
        codeStatus: 200,
        message: 'berhasil delete data',
        data: {
          stodId: stodId,
          stockId: stockId,
        },
      };
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di delete stock detail, ${error.message}`,
      );
    }
  }
}
