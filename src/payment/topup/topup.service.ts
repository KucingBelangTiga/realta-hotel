import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccounts } from 'output/entities/UserAccounts';

@Injectable()
export class TopupService {
  constructor(
    @InjectRepository(UserAccounts)
    private serviceRepo: Repository<UserAccounts>,
  ) {}

  public async credit(
    usacEntityId: number,
    usacUserId: number,
    usacSaldo: string,
    usacNominal: string,
  ) {
    const isValidSource = /[+\-*/.,;'a-zA-Z]/.test(usacSaldo);
    const isValidNominal = /[+\-*/.,;'a-zA-Z]/.test(usacNominal);
    if (isValidSource == true || isValidNominal == true) {
      return `Input Must Be Integer or Numeric`;
    }
    const sourceSaldo: number = parseInt(usacSaldo);
    const nominal: number = parseInt(usacNominal);
    if (nominal < sourceSaldo) {
      return `Nominal ${nominal} Must be lower than sourceSaldo ${sourceSaldo}`;
    }
    const newSourceSaldo: number = sourceSaldo - nominal;
    const newSaldo: string = newSourceSaldo.toString().split('-').join('');
    try {
      const topUp = await this.serviceRepo.save({
        usacEntityId: usacEntityId,
        usacUserId: usacUserId,
        usacSaldo: newSaldo,
        usacModifiedDate: new Date(),
      });
      return topUp;
    } catch (error) {
      return error.message;
    }
  }

  public async debit(
    usacEntityId: number,
    usacUserId: number,
    usacSaldo: string,
    usacNominal: string,
  ) {
    const isValidSource = /[+\-*/.,;'a-zA-Z]/.test(usacSaldo);
    const isValidNominal = /[+\-*/.,;'a-zA-Z]/.test(usacNominal);
    if (isValidSource == true || isValidNominal == true) {
      return `Input Must Be Integer or Numeric`;
    }
    const sourceSaldo = parseInt(usacSaldo);
    const nominal = parseInt(usacNominal);
    const newSourceSaldo = sourceSaldo + nominal;
    const newSaldo = newSourceSaldo.toString();
    try {
      const topUp = await this.serviceRepo.save({
        usacEntityId: usacEntityId,
        usacUserId: usacUserId,
        usacSaldo: newSaldo,
        usacModifiedDate: new Date(),
      });
      return topUp;
    } catch (error) {
      return error.message;
    }
  }
}
