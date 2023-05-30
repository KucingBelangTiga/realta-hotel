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
import { BankDto } from '../payment.dto/payment.dto';

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
  public async Create(@Body() bankDto: BankDto): Promise<BankDto> {
    return await this.Services.addBank(bankDto);
  }
  @Put(':id')
  public async Update(
    @Param('id') id: number,
    @Body() bankDto: BankDto,
  ): Promise<BankDto> {
    return await this.Services.updateBank(id, bankDto);
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteBank(id);
  }
}
