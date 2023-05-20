import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrderHeader } from 'output/entities/PurchaseOrderHeader';

@Injectable()
export class PurchaseOrderheaderService {
  constructor(
    @InjectRepository(PurchaseOrderHeader)
    private purchaseOrderHeaderRepo: Repository<PurchaseOrderHeader>,
  ) {}

  public async listPurchaseOrderHeader() {
    try {
      const response = await this.purchaseOrderHeaderRepo
        .createQueryBuilder('pohe')
        .select(
          'pohe.poheId, pohe.poheNumber, pohe.poheOrderDate, v.vendorName, pohe.poheTotalAmount, pohe.poheStatus, pohe.poheSubtotal, pohe.poheTax',
        )
        .innerJoin('pohe.poheVendor', 'v')
        .orderBy('pohe.poheId', 'ASC')
        .getRawMany();
      return response;
    } catch (error) {
      throw new Error(`terjadi kesalahan di list PO Header, ${error.message}`);
    }
  }

  public async findPurchaseOrderByName(poheNumber: string) {
    try {
      const response = await this.purchaseOrderHeaderRepo
        .createQueryBuilder('PurchaseOrder')
        .select()
        .where('LOWER(PurchaseOrder.poheNumber) Like LOWER(:poheNumber)', {
          poheNumber: `%${poheNumber.toLowerCase()}%`,
        })
        .getMany();
      if (response.length === 0) {
        return {
          statusCode: 401,
          message: 'tidak ditemukan PurchaseOrder',
        };
      } else {
        return response;
      }
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di findByName PurchaseOrder, ${error.message}`,
      );
    }
  }

  public async createPurchaseOrder(
    poheStatus: number,
    poheOrderDate: any,
    poheSubtotal: string,
    poheTax: string,
    poheTotalAmount: string,
    poheRefund: string,
    poheArrivalDate: any,
    pohePayType: string,
    empId: number,
    vendorId: number,
  ) {
    try {
      const response = await this.purchaseOrderHeaderRepo.save({
        poheStatus: poheStatus,
        poheOrderDate: poheOrderDate,
        poheSubtotal: poheSubtotal,
        poheTax: poheTax,
        poheTotalAmount: poheTotalAmount,
        poheRefund: poheRefund,
        poheArrivalDate: poheArrivalDate,
        pohePayType: pohePayType,
        poheEmp: { empId: empId },
        poheVendor: { vendorId: vendorId },
      });
      return response;
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di create PurchaseOrder, ${error.message}`,
      );
    }
  }

  public async editPurchaseOrder(poheId: number, poheStatus: number) {
    try {
      await this.purchaseOrderHeaderRepo.update(
        { poheId: poheId },
        {
          poheStatus: poheStatus,
        },
      );
      return {
        statusCode: 200,
        message: 'berhasil edit data',
        data: {
          poheStatus: poheStatus,
        },
      };
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di edit PurchaseOrder, ${error.message}`,
      );
    }
  }

  public async deletePurchaseOrder(poheId: number) {
    try {
      await this.purchaseOrderHeaderRepo.delete(poheId);
      return {
        statusCode: 200,
        message: 'berhasil hapus data',
        data: {
          poheId: poheId,
        },
      };
    } catch (error) {
      throw new Error(
        `terjadi kesalahan di edit PurchaseOrder, ${error.message}`,
      );
    }
  }
}
