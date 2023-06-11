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
      .leftJoinAndSelect('c.patrUser', 'users')
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
    return await this.serviceRepo.find({
      relations: {
        patrUser: true,
      },
    });
  }
  public async getPaymentTransactionById(id: number) {
    return await this.serviceRepo.findOne({
      where: { patrId: id },
      relations: {
        patrUser: true,
      },
    });
  }
  public async addPaymentTransaction(
    paymentTransactionDto: PaymentTransactionDto,
  ) {
    try {
      const paymentTransaction = await this.serviceRepo.save(
        paymentTransactionDto,
      );
      return paymentTransaction;
    } catch (error) {
      return error.message;
    }
  }
  public async addCreditTransaction(
    paymentTransactionDto: PaymentTransactionDto,
  ) {
    try {
      const paymentTransaction = await this.serviceRepo.save(
        paymentTransactionDto,
      );
      return paymentTransaction;
    } catch (error) {
      return error.message;
    }
  }
  public async addDebitTransaction(
    paymentTransactionDto: PaymentTransactionDto,
  ) {
    try {
      const paymentTransaction = await this.serviceRepo.save(
        paymentTransactionDto,
      );
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
      const paymentTransaction = await this.serviceRepo.update(
        id,
        paymentTransactionDto,
      );
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
