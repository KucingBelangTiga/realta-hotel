import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccounts } from 'output/entities/UserAccounts';

@Injectable()
export class UseraccountsService {
  constructor(
    @InjectRepository(UserAccounts)
    private serviceRepo: Repository<UserAccounts>,
  ) {}

  public async getUserAccount() {
    return await this.serviceRepo.find({
      relations: ['usacEntity', 'usacEntity.bank', 'usacEntity.paymentGateway'],
    });
  }

  public async getCurrentSourceByUser(id: string) {
    return await this.serviceRepo.findOne({
      where: { usacAccountNumber: id },
      relations: ['usacEntity', 'usacEntity.bank', 'usacEntity.paymentGateway'],
    });
  }

  public async getCurrentTargetByUser(id: string) {
    return await this.serviceRepo.findOne({
      where: { usacAccountNumber: id },
      relations: ['usacEntity', 'usacEntity.bank', 'usacEntity.paymentGateway'],
    });
  }

  public async getUserAccountById(id: string) {
    return await this.serviceRepo.findOne({
      where: { usacAccountNumber: id },
      relations: {
        usacEntity: true,
      },
    });
  }

  public async addUserAccount(
    usacEntityId: number,
    usacUserId: number,
    usacAccountNumber: string,
    usacSaldo: string,
    usacType: string,
    usacExpmonth: number,
    usacExpyear: number,
    usacSecureCode: string,
  ) {
    try {
      const userAccount = await this.serviceRepo.save({
        usacEntityId: usacEntityId,
        usacUserId: usacUserId,
        usacAccountNumber: usacAccountNumber,
        usacSaldo: usacSaldo,
        usacType: usacType,
        usacExpmonth: usacExpmonth,
        usacExpyear: usacExpyear,
        usacSecureCode: usacSecureCode,
        usacModifiedDate: new Date(),
      });
      return userAccount;
    } catch (error) {
      return error.message;
    }
  }

  public async updateUserAccount(
    usacEntityId: number,
    usacUserId: number,
    usacAccountNumber: string,
    usacSaldo: string,
    usacType: string,
    usacExpmonth: number,
    usacExpyear: number,
    usacSecureCode: string,
  ) {
    try {
      const userAccount = await this.serviceRepo.update(
        { usacEntityId, usacUserId },
        {
          usacAccountNumber: usacAccountNumber,
          usacSaldo: usacSaldo,
          usacType: usacType,
          usacExpmonth: usacExpmonth,
          usacExpyear: usacExpyear,
          usacSecureCode: usacSecureCode,
          usacModifiedDate: new Date(),
        },
      );
      return userAccount;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteUserAccount(usacEntityId: number, usacUserId: number) {
    try {
      const userAccount = await this.serviceRepo.delete({
        usacEntityId,
        usacUserId,
      });
      return userAccount;
    } catch (error) {
      return error.message;
    }
  }
}
