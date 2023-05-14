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

  public async findPODetaiById(podePoheId: number) {
    try {
      const response = await this.purchaseOrderDetailRepo
        .createQueryBuilder('pode')
        .select(
          's.stockName, pode.podeOrderQty, pode.podePrice, pode.podeReceivedQty, pode.podeRejectedQty, pode.podeLineTotal , s.stockId, pode.podeId',
        )
        .innerJoin('pode.podeStock', 's')
        .where('pode.podePoheId = :podePoheId', { podePoheId })
        .orderBy('pode.podeId', 'ASC')
        .getRawMany();
      return response;
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di findById PO detail, ${error.message}`,
      );
    }
  }

  public async createPODetail(
    podePoheId: number,
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
      const response = await this.purchaseOrderDetailRepo.save({
        podePoheId: podePoheId,
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
    podePoheId: number,
    stockId: number,
    podeOrderQty: number,
    podeReceivedQty: string,
    podeRejectedQty: string,
    podeId: number,
  ) {
    try {
      await this.purchaseOrderDetailRepo.update(
        { podePoheId: podePoheId, podeId: podeId },
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
          podePoheId: podePoheId,
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

  public async deletePODetail(podePoheId: number, podeId: number) {
    try {
      await this.purchaseOrderDetailRepo.delete({
        podePoheId: podePoheId,
        podeId: podeId,
      });
      return {
        codeStatus: 200,
        message: 'berhasil delete data',
        data: {
          poheNumber: podePoheId,
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
