import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class BankDto {
  readonly entityId: number;
  @IsNotEmpty()
  @IsString()
  readonly bankCode: string;
  @IsNotEmpty()
  @IsString()
  readonly bankName: string;
}

export class PaymentGatewayDto {
  readonly entityId: number;
  @IsNotEmpty()
  @IsString()
  readonly pagaCode: string;
  @IsNotEmpty()
  @IsString()
  readonly pagaName: string;
}

export class UserAccountDto {
  @IsNumber()
  readonly usacEntityId: number;
  @IsNumber()
  readonly usacUserId: number;
  @IsNotEmpty()
  @IsString()
  readonly usacAccountNumber: string;
  @IsNotEmpty()
  @IsString()
  readonly usacSaldo: string;
  @IsNotEmpty()
  @IsString()
  readonly usacType: string;
  @IsNumber()
  readonly usacExpmonth: number;
  @IsNumber()
  readonly usacExpyear: number;
  @IsString()
  readonly usacSecureCode: string;
}

export class PaymentTransactionDto {
  @IsNumber()
  readonly patrId: number;
  @IsString()
  readonly patrTrxId: string;
  @IsString()
  readonly patrDebet: string;
  @IsString()
  readonly patrCredit: string;
  @IsString()
  readonly patrType: string;
  @IsString()
  readonly patrNote: string;
  @IsString()
  readonly patrOrderNumber: string;
  @IsString()
  readonly patrSourceId: string;
  @IsString()
  readonly patrTargetId: string;
  @IsString()
  readonly patrTrxNumberRef: string;
  @IsNumber()
  readonly patrUserId: number;
}

export class TopupDto {
  @IsNumber()
  readonly usacEntityId: number;
  @IsNumber()
  readonly usacUserId: number;
  @IsString()
  readonly usacSaldo: string;
  @IsString()
  readonly usacNominal: string;
}
