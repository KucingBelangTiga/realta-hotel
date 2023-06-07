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
import { UseraccountsService } from './useraccounts.service';
import { UserAccountDto } from '../payment.dto/payment.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { UserAccounts } from 'output/entities/UserAccounts';

@Controller('useraccount')
export class UserAccountsController {
  constructor(private Services: UseraccountsService) {}
  @Get()
  public async getAll() {
    return await this.Services.getUserAccount();
  }
  @Get('/page/')
  public async getAllUserAccount(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('name') name: string,
  ): Promise<Pagination<UserAccounts>> {
    limit = limit > 100 ? 100 : limit;
    const options: IPaginationOptions = {
      page,
      limit,
    };
    return this.Services.getAllUser(options, name);
  }
  @Get(':id')
  public async getCurrentSource(@Param('id') id: string) {
    return await this.Services.getCurrentSourceByUser(id);
  }
  @Get(':id')
  public async getCurrentTarget(@Param('id') id: string) {
    return await this.Services.getCurrentTargetByUser(id);
  }
  @Get(':id')
  public async getOne(@Param('id') id: string) {
    return await this.Services.getUserAccountById(id);
  }
  @Post()
  public async Create(
    @Body()
    userAccountDto: UserAccountDto,
  ) {
    return await this.Services.addUserAccount(userAccountDto);
  }
  @Put(':usacEntityId/:usacUserId')
  public async Update(
    @Param('usacEntityId') usacEntityId: number,
    @Param('usacUserId') usacUserId: number,
    @Body() userAccountDto: UserAccountDto,
  ) {
    return await this.Services.updateUserAccount(
      usacEntityId,
      usacUserId,
      userAccountDto,
    );
  }
  @Delete(':usacEntityId/:usacUserId')
  public async Delete(
    @Param('usacEntityId') usacEntityId: number,
    @Param('usacUserId') usacUserId: number,
  ) {
    return await this.Services.deleteUserAccount(usacEntityId, usacUserId);
  }
}
