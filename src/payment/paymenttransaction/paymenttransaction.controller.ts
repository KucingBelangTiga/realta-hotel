import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaymenttransactionService } from './paymenttransaction.service';
import { PaymentTransactionDto } from '../payment.dto/payment.dto';

@Controller('paymenttrx')
export class PaymenttransactionController {
  constructor(private Services: PaymenttransactionService) {}
  @Get()
  public async getAll() {
    return await this.Services.getPaymentTransactions();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.getPaymentTransactionById(id);
  }
  @Post()
  public async Create(
    paymentTransactionDto: PaymentTransactionDto,
  ): Promise<PaymentTransactionDto> {
    return await this.Services.addPaymentTransaction(paymentTransactionDto);
  }
  @Post('/credit')
  public async Credit(
    @Body('patrId') patrId: number,
    @Body('patrTrxId') patrTrxId: string,
    @Body('patrDebet') patrDebet: string,
    @Body('patrCredit') patrCredit: string,
    @Body('patrType') patrType: string,
    @Body('patrNote') patrNote: string,
    @Body('patrOrderNumber') patrOrderNumber: string,
    @Body('patrSourceId') patrSourceId: string,
    @Body('patrTargetId') patrTargetId: string,
    @Body('patrTrxNumberRef') patrTrxNumberRef: string,
    @Body('patrUser') patrUserId: number,
  ) {
    return await this.Services.addCreditTransaction(
      patrId,
      patrTrxId,
      patrDebet,
      patrCredit,
      patrType,
      patrNote,
      patrOrderNumber,
      patrSourceId,
      patrTargetId,
      patrTrxNumberRef,
      patrUserId,
    );
  }
  @Post('/debet')
  public async Debit(
    @Body('patrId') patrId: number,
    @Body('patrTrxId') patrTrxId: string,
    @Body('patrDebet') patrDebet: string,
    @Body('patrCredit') patrCredit: string,
    @Body('patrType') patrType: string,
    @Body('patrNote') patrNote: string,
    @Body('patrOrderNumber') patrOrderNumber: string,
    @Body('patrSourceId') patrSourceId: string,
    @Body('patrTargetId') patrTargetId: string,
    @Body('patrTrxNumberRef') patrTrxNumberRef: string,
    @Body('patrUser') patrUserId: number,
  ) {
    return await this.Services.addDebitTransaction(
      patrId,
      patrTrxId,
      patrDebet,
      patrCredit,
      patrType,
      patrNote,
      patrOrderNumber,
      patrSourceId,
      patrTargetId,
      patrTrxNumberRef,
      patrUserId,
    );
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('patrId') patrId: number,
    @Body('patrTrxId') patrTrxId: string,
    @Body('patrDebet') patrDebet: string,
    @Body('patrCredit') patrCredit: string,
    @Body('patrType') patrType: string,
    @Body('patrNote') patrNote: string,
    @Body('patrOrderNumber') patrOrderNumber: string,
    @Body('patrSourceId') patrSourceId: string,
    @Body('patrTargetId') patrTargetId: string,
    @Body('patrTrxNumberRef') patrTrxNumberRef: string,
    @Body('patrUser') patrUserId: number,
  ) {
    return await this.Services.updatePaymentTransaction(
      id,
      patrId,
      patrTrxId,
      patrDebet,
      patrCredit,
      patrType,
      patrNote,
      patrOrderNumber,
      patrSourceId,
      patrTargetId,
      patrTrxNumberRef,
      patrUserId,
    );
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deletePaymentTransaction(id);
  }
}
