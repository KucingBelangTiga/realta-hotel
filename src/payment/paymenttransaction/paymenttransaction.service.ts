import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository, Brackets } from 'typeorm';
import { PaymentTransaction } from 'output/entities/PaymentTransaction';
import { PaymentTransactionDto } from '../payment.dto/payment.dto';

@Injectable()
export class PaymenttransactionService {
  constructor(
    @InjectRepository(PaymentTransaction)
    private serviceRepo: Repository<PaymentTransaction>,
  ) {}

  public async findAllData(
    options: IPaginationOptions,
    type: string,
    name: string,
  ): Promise<Pagination<PaymentTransaction>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.patrId', 'ASC')
      .where((qb) => {
        qb.where('c.patrType ilike :patrtype', {
          patrtype: `%${type}%`,
        }).andWhere(
          new Brackets((qb) => {
            qb.where('c.patrTrxId ilike :name', { name: `%${name}%` })
              .orWhere('c.patrNote ilike :name', { name: `%${name}%` })
              .orWhere('c.patrOrderNumber ilike :name', { name: `%${name}%` });
          }),
        );
      });
    return paginate<PaymentTransaction>(queryBuilder, options);
  }

  public async getPaymentTransactions() {
    return await this.serviceRepo.find();
  }
  public async getPaymentTransactionById(id: number) {
    return await this.serviceRepo.findOne({
      where: { patrId: id },
    });
  }
  public async addPaymentTransaction(
    paymentTransactionDto: PaymentTransactionDto,
  ) {
    try {
      const paymentTransaction = await this.serviceRepo.save({
        patrId: paymentTransactionDto.patrId,
        patrTrxId: paymentTransactionDto.patrTrxId,
        patrDebet: paymentTransactionDto.patrDebet,
        patrCredit: paymentTransactionDto.patrCredit,
        patrType: paymentTransactionDto.patrType,
        patrNote: paymentTransactionDto.patrNote,
        patrModifiedDate: new Date(),
        patrOrderNumber: paymentTransactionDto.patrOrderNumber,
        patrSourceId: paymentTransactionDto.patrSourceId,
        patrTargetId: paymentTransactionDto.patrTargetId,
        patrTrxNumberRef: paymentTransactionDto.patrTrxNumberRef,
        patrUserId: paymentTransactionDto.patrUserId,
      });
      return paymentTransaction;
    } catch (error) {
      return error.message;
    }
  }
  public async addCreditTransaction(
    paymentTransactionDto: PaymentTransactionDto,
  ) {
    try {
      const paymentTransaction = await this.serviceRepo.save({
        patrId: paymentTransactionDto.patrId,
        patrTrxId: paymentTransactionDto.patrTrxId,
        patrDebet: paymentTransactionDto.patrDebet,
        patrCredit: paymentTransactionDto.patrCredit,
        patrType: paymentTransactionDto.patrType,
        patrNote: paymentTransactionDto.patrNote,
        patrModifiedDate: new Date(),
        patrOrderNumber: paymentTransactionDto.patrOrderNumber,
        patrSourceId: paymentTransactionDto.patrSourceId,
        patrTargetId: paymentTransactionDto.patrTargetId,
        patrTrxNumberRef: paymentTransactionDto.patrTrxNumberRef,
        patrUserId: paymentTransactionDto.patrUserId,
      });
      return paymentTransaction;
    } catch (error) {
      return error.message;
    }
  }
  public async addDebitTransaction(
    paymentTransactionDto: PaymentTransactionDto,
  ) {
    try {
      const paymentTransaction = await this.serviceRepo.save({
        patrId: paymentTransactionDto.patrId,
        patrTrxId: paymentTransactionDto.patrTrxId,
        patrDebet: paymentTransactionDto.patrDebet,
        patrCredit: paymentTransactionDto.patrCredit,
        patrType: paymentTransactionDto.patrType,
        patrNote: paymentTransactionDto.patrNote,
        patrModifiedDate: new Date(),
        patrOrderNumber: paymentTransactionDto.patrOrderNumber,
        patrSourceId: paymentTransactionDto.patrSourceId,
        patrTargetId: paymentTransactionDto.patrTargetId,
        patrTrxNumberRef: paymentTransactionDto.patrTrxNumberRef,
        patrUserId: paymentTransactionDto.patrUserId,
      });
      return paymentTransaction;
    } catch (error) {
      return error.message;
    }
  }
  public async updatePaymentTransaction(
    id: number,
    paymentTransactionDto: PaymentTransactionDto,
  ) {
    try {
      const paymentTransaction = await this.serviceRepo.update(id, {
        patrId: paymentTransactionDto.patrId,
        patrTrxId: paymentTransactionDto.patrTrxId,
        patrDebet: paymentTransactionDto.patrDebet,
        patrCredit: paymentTransactionDto.patrCredit,
        patrType: paymentTransactionDto.patrType,
        patrNote: paymentTransactionDto.patrNote,
        patrModifiedDate: new Date(),
        patrOrderNumber: paymentTransactionDto.patrOrderNumber,
        patrSourceId: paymentTransactionDto.patrSourceId,
        patrTargetId: paymentTransactionDto.patrTargetId,
        patrTrxNumberRef: paymentTransactionDto.patrTrxNumberRef,
        patrUserId: paymentTransactionDto.patrUserId,
      });
      return paymentTransaction;
    } catch (error) {
      return error.message;
    }
  }
  public async deletePaymentTransaction(id: number) {
    try {
      const paymentTransaction = await this.serviceRepo.delete(id);
      return paymentTransaction;
    } catch (error) {
      return error.message;
    }
  }
}
