import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaymenttransactionService } from './paymenttransaction.service';
import { PaymentTransactionDto } from '../payment.dto/payment.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaymentTransaction } from 'output/entities/PaymentTransaction';

@Controller('paymenttrx')
export class PaymenttransactionController {
  constructor(private Services: PaymenttransactionService) {}
  @Get()
  public async getAll() {
    return await this.Services.getPaymentTransactions();
  }
  @Get('/page/')
  public async getAllData(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('type') type: string,
    @Query('name') name: string,
  ): Promise<Pagination<PaymentTransaction>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.findAllData(
      {
        page,
        limit,
      },
      type,
      name,
    );
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.getPaymentTransactionById(id);
  }
  @Post()
  public async Create(@Body() paymentTransactionDto: PaymentTransactionDto) {
    return await this.Services.addPaymentTransaction(paymentTransactionDto);
  }
  @Post('/credit')
  public async Credit(@Body() paymentTransactionDto: PaymentTransactionDto) {
    return await this.Services.addCreditTransaction(paymentTransactionDto);
  }
  @Post('/debet')
  public async Debit(@Body() paymentTransactionDto: PaymentTransactionDto) {
    return await this.Services.addDebitTransaction(paymentTransactionDto);
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body() paymentTransactionDto: PaymentTransactionDto,
  ) {
    return await this.Services.updatePaymentTransaction(
      id,
      paymentTransactionDto,
    );
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deletePaymentTransaction(id);
  }
}
