import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from 'output/entities/Bank';
import { Entitys } from 'output/entities/Entitys';

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

  public async getBankById(id: number) {
    return await this.serviceRepo.findOne({
      where: { bankEntityId: id },
      relations: {
        bankEntity: true,
      },
    });
  }

  public async addBank(bankCode: string, bankName: string) {
    try {
      const entity = await this.entityRepo.save({});
      const bank = await this.serviceRepo.save({
        bankEntity: {
          entityId: entity.entityId,
        },
        bankCode: bankCode,
        bankName: bankName,
        bankModifiedDate: new Date(),
      });
      return bank;
    } catch (error) {
      return error.message;
    }
  }

  public async updateBank(
    id: number,
    bankEntityId: number,
    bankCode: string,
    bankName: string,
  ) {
    try {
      const bank = await this.serviceRepo.update(id, {
        bankEntityId: bankEntityId,
        bankCode: bankCode,
        bankName: bankName,
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
