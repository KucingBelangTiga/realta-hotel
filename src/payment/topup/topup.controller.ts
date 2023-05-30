import { Body, Controller, Post } from '@nestjs/common';
import { TopupService } from './topup.service';
import { TopupDto } from '../payment.dto/payment.dto';

@Controller('topup')
export class TopupController {
  constructor(private Services: TopupService) {}
  @Post('/credit')
  public async Credit(@Body() topupDto: TopupDto) {
    return await this.Services.credit(topupDto);
  }

  @Post('/debet')
  public async Debit(@Body() topupDto: TopupDto) {
    return await this.Services.debit(topupDto);
  }
}
