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

  public async findStockDetaiById(stockId: number, page: number) {
    try {
      const data = await this.stockDetailRepo
        .createQueryBuilder('sd')
        .select(
          'sd.stodId as stodId, sd.stodBarcodeNumber as stodBarcodeNumber, sd.stodStatus as stodStatus, sd.stodNotes as stodNotes, po.poheNumber as poheNumber, f.faciName as faciName, f.faciId as faciId, s.stockId as stockId',
        )
        .innerJoin('sd.stodPohe', 'po')
        .innerJoin('sd.stodFaci', 'f')
        .innerJoin('sd.stodStock', 's')
        .where('sd.stodStock.stockId=:stockId', { stockId })
        .offset((page - 1) * 10)
        .limit(10)
        .getRawMany();
      const total = await this.stockDetailRepo
        .createQueryBuilder('sd')
        .where('sd.stodStock = :stockId', { stockId })
        .getCount();
      return { data, total };
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
