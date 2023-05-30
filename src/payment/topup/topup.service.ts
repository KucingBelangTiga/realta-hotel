import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccounts } from 'output/entities/UserAccounts';
import { TopupDto } from '../payment.dto/payment.dto';

@Injectable()
export class TopupService {
  constructor(
    @InjectRepository(UserAccounts)
    private serviceRepo: Repository<UserAccounts>,
  ) {}

  public async credit(topupDto: TopupDto) {
    const isValidSource = /[+\-*/.,;'a-zA-Z]/.test(topupDto.usacSaldo);
    const isValidNominal = /[+\-*/.,;'a-zA-Z]/.test(topupDto.usacNominal);
    if (isValidSource == true || isValidNominal == true) {
      return `Input Must Be Integer or Numeric`;
    }
    const sourceSaldo: number = parseInt(topupDto.usacSaldo);
    const nominal: number = parseInt(topupDto.usacNominal);
    if (nominal < sourceSaldo) {
      return `Nominal ${nominal} Must be lower than sourceSaldo ${sourceSaldo}`;
    }
    const newSourceSaldo: number = sourceSaldo - nominal;
    const newSaldo: string = newSourceSaldo.toString().split('-').join('');
    try {
      const topUp = await this.serviceRepo.save({
        usacEntityId: topupDto.usacEntityId,
        usacUserId: topupDto.usacUserId,
        usacSaldo: newSaldo,
        usacModifiedDate: new Date(),
      });
      return topUp;
    } catch (error) {
      return error.message;
    }
  }

  public async debit(topupDto: TopupDto) {
    const isValidSource = /[+\-*/.,;'a-zA-Z]/.test(topupDto.usacSaldo);
    const isValidNominal = /[+\-*/.,;'a-zA-Z]/.test(topupDto.usacNominal);
    if (isValidSource == true || isValidNominal == true) {
      return `Input Must Be Integer or Numeric`;
    }
    const sourceSaldo = parseInt(topupDto.usacSaldo);
    const nominal = parseInt(topupDto.usacNominal);
    const newSourceSaldo = sourceSaldo + nominal;
    const newSaldo = newSourceSaldo.toString();
    try {
      const topUp = await this.serviceRepo.save({
        usacEntityId: topupDto.usacEntityId,
        usacUserId: topupDto.usacUserId,
        usacSaldo: newSaldo,
        usacModifiedDate: new Date(),
      });
      return topUp;
    } catch (error) {
      return error.message;
    }
  }
}
