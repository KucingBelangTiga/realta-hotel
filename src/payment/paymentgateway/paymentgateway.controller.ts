import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaymentgatewayService } from './paymentgateway.service';
import { PaymentGatewayDto } from '../payment.dto/payment.dto';

@Controller('paymentgateway')
export class PaymentgatewayController {
  constructor(private Services: PaymentgatewayService) {}
  @Get()
  public async getAll() {
    return await this.Services.getPaymentGateways();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.getPaymentGatewayById(id);
  }
  @Post()
  public async Create(@Body() paymentGatewayDto: PaymentGatewayDto) {
    return await this.Services.addPaymentGateway(paymentGatewayDto);
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body() paymentGatewayDto: PaymentGatewayDto,
  ) {
    return await this.Services.updatePaymentGateway(id, paymentGatewayDto);
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deletePaymentGateway(id);
  }
}
