import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UseraccountsService } from './useraccounts.service';

@Controller('useraccount')
export class UserAccountsController {
  constructor(private Services: UseraccountsService) {}
  @Get()
  public async getAll() {
    return await this.Services.getUserAccount();
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
    @Body('usacEntityId') usacEntityId: number,
    @Body('usacUserId') usacUserId: number,
    @Body('usacAccountNumber') usacAccountNumber: string,
    @Body('usacSaldo') usacSaldo: string,
    @Body('usacType') usacType: string,
    @Body('usacExpmonth') usacExpmonth: number,
    @Body('usacExpyear') usacExpyear: number,
    @Body('usacSecureCode') usacSecureCode: string,
  ) {
    return await this.Services.addUserAccount(
      usacEntityId,
      usacUserId,
      usacAccountNumber,
      usacSaldo,
      usacType,
      usacExpmonth,
      usacExpyear,
      usacSecureCode,
    );
  }
  @Put(':usacEntityId/:usacUserId')
  public async Update(
    @Param('usacEntityId') usacEntityId: number,
    @Param('usacUserId') usacUserId: number,
    @Body('usacAccountNumber') usacAccountNumber: string,
    @Body('usacSaldo') usacSaldo: string,
    @Body('usacType') usacType: string,
    @Body('usacExpmonth') usacExpmonth: number,
    @Body('usacExpyear') usacExpyear: number,
    @Body('usacSecureCode') usacSecureCode: string,
  ) {
    return await this.Services.updateUserAccount(
      usacEntityId,
      usacUserId,
      usacAccountNumber,
      usacSaldo,
      usacType,
      usacExpmonth,
      usacExpyear,
      usacSecureCode,
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
