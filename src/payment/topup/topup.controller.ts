import { Body, Controller, Post } from '@nestjs/common';
import { TopupService } from './topup.service';

@Controller('topup')
export class TopupController {
  constructor(private Services: TopupService) {}
  @Post('/credit')
  public async Credit(
    @Body('usacEntityId') usacEntityId: number,
    @Body('usacUserId') usacUserId: number,
    @Body('usacSaldo') usacSaldo: string,
    @Body('usacNominal') usacNominal: string,
  ) {
    return await this.Services.credit(
      usacEntityId,
      usacUserId,
      usacNominal,
      usacSaldo,
    );
  }

  @Post('/debet')
  public async Debit(
    @Body('usacEntityId') usacEntityId: number,
    @Body('usacUserId') usacUserId: number,
    @Body('usacSaldo') usacSaldo: string,
    @Body('usacNominal') usacNominal: string,
  ) {
    return await this.Services.debit(
      usacEntityId,
      usacUserId,
      usacNominal,
      usacSaldo,
    );
  }
}
