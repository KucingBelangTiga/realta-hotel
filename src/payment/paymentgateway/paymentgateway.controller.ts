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
  public async Create(
    @Body('pagaEntityId') pagaEntityId: number,
    @Body('pagaCode') pagaCode: string,
    @Body('pagaName') pagaName: string,
  ) {
    return await this.Services.addPaymentGateway(
      pagaEntityId,
      pagaCode,
      pagaName,
    );
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('pagaEntityId') pagaEntityId: number,
    @Body('pagaCode') pagaCode: string,
    @Body('pagaName') pagaName: string,
  ) {
    return await this.Services.updatePaymentGateway(
      id,
      pagaEntityId,
      pagaCode,
      pagaName,
    );
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deletePaymentGateway(id);
  }
}
