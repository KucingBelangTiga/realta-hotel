import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentGateway } from 'output/entities/PaymentGateway';
import { Entitys } from 'output/entities/Entitys';
import { PaymentGatewayDto } from '../payment.dto/payment.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PaymentgatewayService {
  constructor(
    @InjectRepository(PaymentGateway)
    private serviceRepo: Repository<PaymentGateway>,
    @InjectRepository(Entitys)
    private entityRepo: Repository<Entitys>,
  ) {}
  public async getAllPaymentGateway(
    options: IPaginationOptions,
    name: string,
  ): Promise<Pagination<PaymentGateway>> {
    const queryBuilder = this.serviceRepo
      .createQueryBuilder('c')
      .orderBy('c.pagaEntityId', 'ASC')
      .where('c.pagaCode ilike :name', {
        name: `%${name}%`,
      })
      .orWhere('c.pagaName ilike :name', {
        name: `%${name}%`,
      });
    return paginate<PaymentGateway>(queryBuilder, options);
  }

  public async getPaymentGateways() {
    return await this.serviceRepo.find({
      relations: {
        pagaEntity: true,
      },
    });
  }

  public async getPaymentGatewayById(id: number) {
    return await this.serviceRepo.findOne({
      where: { pagaEntityId: id },
      relations: {
        pagaEntity: true,
      },
    });
  }

  public async addPaymentGateway(paymentGatewayDto: PaymentGatewayDto) {
    try {
      const entity = await this.entityRepo.save({});
      const paymentGateway = await this.serviceRepo.save({
        pagaEntity: {
          entityId: entity.entityId,
        },
        pagaCode: paymentGatewayDto.pagaCode,
        pagaName: paymentGatewayDto.pagaName,
        pagaModifiedDate: new Date(),
      });
      return paymentGateway;
    } catch (error) {
      return error.message;
    }
  }

  public async updatePaymentGateway(
    id: number,
    paymentGatewayDto: PaymentGatewayDto,
  ) {
    try {
      const paymentGateway = await this.serviceRepo.update(id, {
        pagaEntityId: paymentGatewayDto.entityId,
        pagaCode: paymentGatewayDto.pagaCode,
        pagaName: paymentGatewayDto.pagaName,
        pagaModifiedDate: new Date(),
      });
      return paymentGateway;
    } catch (error) {
      return error.message;
    }
  }

  public async deletePaymentGateway(id: number) {
    try {
      const paymentGateway = await this.serviceRepo.delete(id);
      return paymentGateway;
    } catch (error) {
      return error.message;
    }
  }
}
