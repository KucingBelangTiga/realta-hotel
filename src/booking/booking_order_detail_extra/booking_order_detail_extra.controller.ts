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
import { BookingOrderDetailExtraService } from './booking_order_detail_extra.service';
import { PriceItems } from 'output/entities/PriceItems';

@Controller('booking-order-detail-extra')
export class BookingOrderDetailExtraController {
    constructor(private BookingOrderDetailExtraService: BookingOrderDetailExtraService) { }

    @Get()
    public async getAll() {
        return await this.BookingOrderDetailExtraService.findAll();
    }

    @Get(':id')
    public async getOne(@Param('id') boexId: number) {
        return await this.BookingOrderDetailExtraService.findOne(boexId);
    }

    @Post()
    public async create(
        // @Body('boexId') boexId: number,
        @Body('boexPrice') boexPrice: string,
        @Body('boexQty') boexQty: number,
        @Body('boexSubtotal') boexSubtotal: string,
        @Body('boexMeasureUnit') boexMeasureUnit: string,
        @Body('boexPrit') boexPrit: PriceItems,
        @Body('boexBorde') boexBorde: BookingOrderDetail,
    ) {
        return await this.BookingOrderDetailExtraService.CreateBoEx(
            // boexId, 
            boexPrice, boexQty, boexSubtotal, boexMeasureUnit, boexPrit, boexBorde);
    }

    @Put(':boexId')
    public async update(
        @Param(':boexId') boexId: number,
        @Body('boexPrice') boexPrice: string,
        @Body('boexQty') boexQty: number,
        @Body('boexSubtotal') boexSubtotal: string,
        @Body('boexMeasureUnit') boexMeasureUnit: string,
        @Body('boexPrit') boexPrit: PriceItems,
        @Body('boexBorde') boexBorde: BookingOrderDetail,
    ) {
        return await this.BookingOrderDetailExtraService.UpdateBoEx(
            boexId,
            boexPrice, boexQty, boexSubtotal, boexMeasureUnit, boexPrit, boexBorde);
    }

    @Delete(':boexId')
    public async delete(@Param(':boexId') boexId: number) {
        return await this.BookingOrderDetailExtraService.DeleteBoEx(boexId);
    }
}
