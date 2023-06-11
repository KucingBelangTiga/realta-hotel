import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Users } from 'output/entities/Users';

export class BankDto {
  bankEntityId?: number;
  @IsNotEmpty()
  @IsString()
  bankCode: string;
  @IsNotEmpty()
  @IsString()
  bankName: string;
}

export class PaymentGatewayDto {
  pagaEntityId?: number;
  @IsNotEmpty()
  @IsString()
  pagaCode: string;
  @IsNotEmpty()
  @IsString()
  pagaName: string;
}

export class UserAccountDto {
  usacEntityId?: number;
  usacUserId?: number;
  @IsNotEmpty()
  @IsString()
  usacAccountNumber: string;
  @IsNotEmpty()
  @IsString()
  usacSaldo: string;
  @IsNotEmpty()
  @IsString()
  usacType: string;
  @IsNumber()
  usacExpmonth: number;
  @IsNumber()
  usacExpyear: number;
  @IsString()
  usacSecureCode: string;
}

export class PaymentTransactionDto {
  @IsNumber()
  patrId: number;
  @IsString()
  patrTrxId: string;
  @IsString()
  patrDebet: string;
  @IsString()
  patrCredit: string;
  @IsString()
  patrType: string;
  @IsString()
  patrModifiedDate: Date = new Date();
  patrNote: string;
  @IsString()
  patrOrderNumber: string;
  @IsString()
  patrSourceId: string;
  @IsString()
  patrTargetId: string;
  @IsString()
  patrTrxNumberRef: string;
  @IsNumber()
  patrUser: Users;
}

export class TopupDto {
  @IsNumber()
  usacEntityId: number;
  @IsNumber()
  usacUserId: number;
  @IsString()
  usacSaldo: string;
  @IsString()
  usacNominal: string;
}
