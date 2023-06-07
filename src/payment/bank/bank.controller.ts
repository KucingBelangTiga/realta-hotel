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
import { BankService } from './bank.service';
import { BankDto } from '../payment.dto/payment.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Bank } from 'output/entities/Bank';

@Controller('bank')
export class BankController {
  constructor(private Services: BankService) {}
  @Get('/page/')
  public async getPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('name') name: string,
  ): Promise<Pagination<Bank>> {
    limit = limit > 100 ? 100 : limit;
    return this.Services.getAllBank(
      {
        page,
        limit,
      },
      name,
    );
  }
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
  public async Update(@Param('id') id: number, @Body() bankDto: BankDto) {
    return await this.Services.updateBank(id, bankDto);
  }
  @Delete(':id')
  public async Delete(@Param('id') id: number) {
    return await this.Services.deleteBank(id);
  }
}
