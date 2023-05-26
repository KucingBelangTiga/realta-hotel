import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BankService } from './bank.service';

@Controller('bank')
export class BankController {
  constructor(private Services: BankService) {}
  @Get()
  public async getAll() {
    return await this.Services.getBanks();
  }
  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.Services.getBankById(id);
  }
  @Post()
  public async Create(
    @Body('bankCode') bankCode: string,
    @Body('bankName') bankName: string,
  ) {
    return await this.Services.addBank(bankCode, bankName);
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body('entityId') entityId: number,
    @Body('bankCode') bankCode: string,
    @Body('bankName') bankName: string,
  ) {
    return await this.Services.updateBank(id, entityId, bankCode, bankName);
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteBank(id);
  }
}
