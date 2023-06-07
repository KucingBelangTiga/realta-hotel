import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Bank } from 'output/entities/Bank';
import { Entitys } from 'output/entities/Entitys';
import { BankDto } from '../payment.dto/payment.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private serviceRepo: Repository<Bank>,
    @InjectRepository(Entitys)
    private entityRepo: Repository<Entitys>,
  ) {}

  public async getBanks() {
    return await this.serviceRepo.find({
      relations: {
        bankEntity: true,
      },
    });
  }

  public async getAllBank(
    options: IPaginationOptions,
    name: string,
  ): Promise<Pagination<Bank>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.bankEntityId', 'ASC')
      .where('c.bankCode ilike :name', {
        name: `%${name}%`,
      })
      .orWhere('c.bankName ilike :name', {
        name: `%${name}%`,
      });
    return paginate<Bank>(queryBuilder, options);
  }

  public async getBankById(id: number) {
    return await this.serviceRepo.findOne({
      where: { bankEntityId: id },
      relations: {
        bankEntity: true,
      },
    });
  }

  public async addBank(bankDto: BankDto) {
    try {
      const entity = await this.entityRepo.save({});
      const bank = await this.serviceRepo.save({
        bankEntity: {
          entityId: entity.entityId,
        },
        bankCode: bankDto.bankCode,
        bankName: bankDto.bankName,
        bankModifiedDate: new Date(),
      });
      return bank;
    } catch (error) {
      return error.message;
    }
  }

  public async updateBank(id: number, bankDto: BankDto) {
    try {
      const bank = await this.serviceRepo.update(id, {
        bankEntityId: bankDto.entityId,
        bankCode: bankDto.bankCode,
        bankName: bankDto.bankName,
        bankModifiedDate: new Date(),
      });
      return bank;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteBank(id: number) {
    try {
      const bank = await this.serviceRepo.delete(id);
      return bank;
    } catch (error) {
      return error.message;
    }
  }
}
