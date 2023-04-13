import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stocks } from 'output/entities/Stocks';
import { Repository } from 'typeorm';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stocks) private stockRepo: Repository<Stocks>,
  ) {}

  public async listStock() {
    try {
      const response = await this.stockRepo.find();
      if (response.length === 0) {
        return {
          statusCode: 401,
          message: 'tidak ditemukan stock',
        };
      } else {
        return response;
      }
    } catch (error) {
      throw new Error(`terjadi kesalahan di list stock, ${error.message}`);
    }
  }

  public async findStockByName(stockName: string) {
    try {
      const response = await this.stockRepo
        .createQueryBuilder('stock')
        .select()
        .where('LOWER(stock.stockName) Like LOWER(:stockName)', {
          stockName: `%${stockName.toLowerCase()}%`,
        })
        .getMany();
      if (response.length === 0) {
        return {
          statusCode: 401,
          message: 'tidak ditemukan stock',
        };
      } else {
        return response;
      }
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
}
