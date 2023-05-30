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
import { UserAccountDto } from '../payment.dto/payment.dto';

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
