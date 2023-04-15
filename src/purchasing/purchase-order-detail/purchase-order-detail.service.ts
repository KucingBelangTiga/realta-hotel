import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrderDetail } from 'output/entities/PurchaseOrderDetail';
import { PurchaseOrderHeader } from 'output/entities/PurchaseOrderHeader';

@Injectable()
export class PurchaseOrderDetailService {
  constructor(
    @InjectRepository(PurchaseOrderDetail)
    private purchaseOrderDetailRepo: Repository<PurchaseOrderDetail>,
    @InjectRepository(PurchaseOrderHeader)
    private purchaseOrderHeaderRepo: Repository<PurchaseOrderHeader>,
  ) {}

  public async findPODetaiById(poheNumber: string) {
    try {
      const findPohe = await this.purchaseOrderHeaderRepo.findOne({
        where: { poheNumber: poheNumber },
      });
      const getpoheId = findPohe.poheId;
      const response = await this.purchaseOrderDetailRepo
        .createQueryBuilder('pode')
        .select(
          's.stockName, pode.podeOrderQty, pode.podePrice, pode.podeReceivedQty, pode.podeRejectedQty, pode.podeLineTotal',
        )
        .innerJoin('pode.podeStock', 's')
        .where('pode.podePoheId = :getpoheId', { getpoheId })
        .getRawMany();
      if (response.length === 0) {
        return {
          statusCode: 404,
          message: 'PO tidak ditemukan',
        };
      } else {
        return response;
      }
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di findById PO detail, ${error.message}`,
      );
    }
  }

  public async createPODetail(
    poheNumber: string,
    podeOrderQty: number,
    podePrice: string,
    podeLineTotal: string,
    podeReceivedQty: string,
    podeRejectedQty: string,
    podeStockedQty: string,
    podeModifiedDate: any,
    stockId: number,
  ) {
    try {
      const findPohe = await this.purchaseOrderHeaderRepo.findOne({
        where: { poheNumber: poheNumber },
      });
      const response = await this.purchaseOrderDetailRepo.save({
        podePoheId: findPohe.poheId,
        podeOrderQty: podeOrderQty,
        podePrice: podePrice,
        podeLineTotal: podeLineTotal,
        podeReceivedQty: podeReceivedQty,
        podeRejectedQty: podeRejectedQty,
        podeStockedQty: podeStockedQty,
        podeModifiedDate: podeModifiedDate,
        podeStock: { stockId: stockId },
      });
      return response;
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di create PO detail, ${error.message}`,
      );
    }
  }

  public async editPODetail(
    poheNumber: string,
    stockId: number,
    podeOrderQty: number,
    podeReceivedQty: string,
    podeRejectedQty: string,
    podeId: number,
  ) {
    try {
      const findPohe = await this.purchaseOrderHeaderRepo.findOne({
        where: { poheNumber: poheNumber },
      });
      await this.purchaseOrderDetailRepo.update(
        { podePoheId: findPohe.poheId, podeId: podeId },
        {
          podeStock: { stockId: stockId },
          podeOrderQty: podeOrderQty,
          podeReceivedQty: podeReceivedQty,
          podeRejectedQty: podeRejectedQty,
        },
      );
      return {
        codeStatus: 200,
        message: 'berhasil update data',
        data: {
          poheNumber: poheNumber,
          stockId: stockId,
          odeOrderQty: podeOrderQty,
          podeReceivedQty: podeReceivedQty,
          podeRejectedQty: podeRejectedQty,
        },
      };
    } catch (error) {
      throw new Error(`terjadi kesalahan di edit PO detail, ${error.message}`);
    }
  }

  public async deletePODetail(poheNumber: string, podeId: number) {
    try {
      const findPohe = await this.purchaseOrderHeaderRepo.findOne({
        where: { poheNumber: poheNumber },
      });
      await this.purchaseOrderDetailRepo.delete({
        podePoheId: findPohe.poheId,
        podeId: podeId,
      });
      return {
        codeStatus: 200,
        message: 'berhasil delete data',
        data: {
          poheNumber: poheNumber,
          podeId: podeId,
        },
      };
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di delete PO detail, ${error.message}`,
      );
    }
  }
}
