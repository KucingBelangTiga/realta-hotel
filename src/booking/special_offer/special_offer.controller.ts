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
import { FileInterceptor } from '@nestjs/platform-express';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';
import { Hotels } from 'output/entities/Hotels';
import { Facilities } from 'output/entities/Facilities';
import { SpecialOfferService } from './special_offer.service';

@Controller('special-offer')
export class SpecialOfferController {
    constructor(private SpecialOfferService: SpecialOfferService) { }

    @Get()
    public async getAll() {
        return await this.SpecialOfferService.findAll();
    }

    @Get(':id')
    public async getOne(@Param('id') spofId: number) {
        return await this.SpecialOfferService.findOne(spofId);
    }

    @Post()
    public async create(
        @Body('spofId') spofId: number,
        @Body('spofName') spofName: string,
        @Body('spofDescription') spofDescription: string,
        @Body('spofType') spofType: string,
        @Body('spofDiscount') spofDiscount: string,
        @Body('spofStartDate') spofStartDate: Date,
        @Body('spofEndDate') spofEndDate: Date,
        @Body('spofMinQty') spofMinQty: number,
        @Body('spofMaxQty') spofMaxQty: number,
        @Body('spofModifiedDate') spofModifiedDate: Date,
    ) {
        return await this.SpecialOfferService.CreateSpecialOffer(spofId, spofName, spofDescription, spofType, spofDiscount, spofStartDate, spofEndDate, spofMinQty, spofMaxQty, spofModifiedDate);
    }

    @Put(':spofId')
    public async update(
        @Param('spofId') spofId: number,
        @Body('spofName') spofName: string,
        @Body('spofDescription') spofDescription: string,
        @Body('spofType') spofType: string,
        @Body('spofDiscount') spofDiscount: string,
        @Body('spofStartDate') spofStartDate: Date,
        @Body('spofEndDate') spofEndDate: Date,
        @Body('spofMinQty') spofMinQty: number,
        @Body('spofMaxQty') spofMaxQty: number,
        @Body('spofModifiedDate') spofModifiedDate: Date,
    ) {
        return await this.SpecialOfferService.UpdateSpecialOffer(spofId, spofName, spofDescription, spofType, spofDiscount, spofStartDate, spofEndDate, spofMinQty, spofMaxQty, spofModifiedDate);
    }

    @Delete(':spofId')
    public async delete(@Param('spofId') spofId: number) {
        return await this.SpecialOfferService.DeleteSpecialOffer(spofId);
    }
}
