export class BankDto {
  readonly id?: number;
  readonly entityId: number;
  readonly bankCode: string;
  readonly bankName: string;
}

export class PaymentGatewayDto {
  readonly id?: number;
  readonly entityId: number;
  readonly pagaCode: string;
  readonly pagaName: string;
}

export class UserAccountDto {
  readonly id?: number;
  readonly usacEntityId: number;
  readonly usacUserId: number;
  readonly usacAccountNumber: string;
  readonly usacSaldo: string;
  readonly usacType: string;
  readonly usacExpmonth: number;
  readonly usacExpyear: number;
  readonly usacSecureCode: string;
}

export class PaymentTransactionDto {
  readonly id?: number;
  readonly patrId: number;
  readonly patrTrxId: string;
  readonly patrDebet: string;
  readonly patrCredit: string;
  readonly patrType: string;
  readonly patrNote: string;
  readonly patrOrderNumber: string;
  readonly patrSourceId: string;
  readonly patrTargetId: string;
  readonly patrTrxNumberRef: string;
  readonly patrUserId: number;
}

export class TopupDto {
  readonly id?: number;
  readonly usacEntityId: number;
  readonly usacUserId: number;
  readonly usacSaldo: string;
  readonly usacNominal: string;
}
