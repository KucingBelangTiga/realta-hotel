import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { UserBreakfeastService } from './user_breakfeast.service';

@Controller('user-breakfeast')
export class UserBreakfeastController {
    constructor(private UserBreakfeastService: UserBreakfeastService) { }

    @Get()
    public async getAll() {
        return await this.UserBreakfeastService.findAll();
    }

    @Get(':id')
    public async getOne(@Param('id') usbrId: number) {
        return await this.UserBreakfeastService.findOne(usbrId);
    }

    @Post()
    public async create(
        @Body('usbrBordeId') usbrBordeId: number,
        @Body('usbrModifiedDate') usbrModifiedDate: Date,
        @Body('usbrTotalVacant') usbrTotalVacant: number
    ) {
        return await this.UserBreakfeastService.createUsbr(usbrBordeId, usbrModifiedDate, usbrTotalVacant);
    }

    @Put(':usbrId')
    public async update(
        @Param('usbrBordeId') usbrBordeId: number,
        @Body('usbrModifiedDate') usbrModifiedDate: Date,
        @Body('usbrTotalVacant') usbrTotalVacant: number
    ) {
        return await this.UserBreakfeastService.updateUsbr(usbrBordeId, usbrModifiedDate, usbrTotalVacant);
    }

    @Delete(':usbrId')
    public async delete(@Param('usbrBordeId') usbrBordeId: number) {
        return await this.UserBreakfeastService.deleteUsbr(usbrBordeId);
    }
}
