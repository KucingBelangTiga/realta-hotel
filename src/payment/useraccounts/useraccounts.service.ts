import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { UserAccounts } from 'output/entities/UserAccounts';
import { UserAccountDto } from '../payment.dto/payment.dto';

@Injectable()
export class UseraccountsService {
  constructor(
    @InjectRepository(UserAccounts)
    private serviceRepo: Repository<UserAccounts>,
  ) {}
  public async getUserAccount() {
    return await this.serviceRepo.find({
      relations: [
        'usacEntity',
        'usacEntity.bank',
        'usacEntity.paymentGateway',
        'usacUser',
        'usacUser.userAccounts',
      ],
    });
  }
  public async getAllUser(
    options: IPaginationOptions,
    name: string,
  ): Promise<Pagination<UserAccounts>> {
    options.limit = 10;
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.usacEntity', 'entity')
      .leftJoinAndSelect('entity.bank', 'bank')
      .leftJoinAndSelect('entity.paymentGateway', 'paymentGateway')
      .orderBy('c.usacUserId', 'ASC')
      .where('c.usacAccountNumber ilike :name', {
        name: `%${name}%`,
      })
      .orWhere('c.usacType ilike :name', {
        name: `%${name}%`,
      });
    return paginate<UserAccounts>(queryBuilder, options);
  }

  public async getCurrentSourceByUser(id: string) {
    return await this.serviceRepo.findOne({
      where: { usacAccountNumber: id },
      relations: [
        'usacEntity',
        'usacEntity.bank',
        'usacEntity.paymentGateway',
        'usacUser',
        'usacUser.userAccounts',
      ],
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

  public async addUserAccount(userAccountDto: UserAccountDto) {
    try {
      const userAccount = await this.serviceRepo.save({
        ...userAccountDto,
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
    userAccountDto: UserAccountDto,
  ) {
    try {
      const userAccount = await this.serviceRepo.update(
        { usacEntityId, usacUserId },
        {
          ...userAccountDto,
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
