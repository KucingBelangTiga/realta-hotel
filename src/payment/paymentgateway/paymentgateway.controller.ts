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
import { PaymentgatewayService } from './paymentgateway.service';
import { PaymentGatewayDto } from '../payment.dto/payment.dto';
import { PaymentGateway } from 'output/entities/PaymentGateway';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('paymentgateway')
export class PaymentgatewayController {
  constructor(private Services: PaymentgatewayService) {}
  @Get('/page/')
  public async getPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('name') name: string,
  ): Promise<Pagination<PaymentGateway>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.getAllPaymentGateway(
      {
        page,
        limit,
      },
      name,
    );
  }
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
