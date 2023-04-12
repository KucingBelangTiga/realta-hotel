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
import { BookingOrderDetailService } from './booking_order_detail.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';
import { Hotels } from 'output/entities/Hotels';
import { Facilities } from 'output/entities/Facilities';

@Controller('booking-order-detail')
export class BookingOrderDetailController {
    constructor(private BookingOrderDetailService: BookingOrderDetailService) { }

    @Get()
    public async getAll() {
        return await this.BookingOrderDetailService.findAll();
    }

    @Get(':id')
    public async getOne(@Param('id') bordeId: number) {
        return await this.BookingOrderDetailService.findOne(bordeId);
    }

    @Post()
    public async create(
        @Body('borderBoorId') borderBoorId: number,
        @Body('bordeId') bordeId: number,
        @Body('bordeCheckin') bordeCheckin: Date,
        @Body('bordeCheckout') bordeCheckout: Date,
        @Body('bordeAdults') bordeAdults: number,
        @Body('bordeKids') bordeKids: number,
        @Body('bordePrice') bordePrice: string,
        @Body('bordeExtra') bordeExtra: string,
        @Body('bordeDiscount') bordeDiscount: string,
        @Body('bordeTax') bordeTax: string,
        @Body('bordeSubtotal') bordeSubtotal: string,
        @Body('bordeFaci') bordeFaci: Facilities,
    ) {
        return await this.BookingOrderDetailService.CreateBookingDetail(
            borderBoorId, bordeId, bordeCheckin, bordeCheckout, bordeAdults, bordeKids, bordePrice, bordeExtra, bordeDiscount, bordeTax, bordeSubtotal, bordeFaci
        );
    }

    @Put(':bordeId')
    public async update(
        @Param('bordeId') bordeId: number,
        @Body('bordeCheckin') bordeCheckin: Date,
        @Body('bordeCheckout') bordeCheckout: Date,
        @Body('bordeAdults') bordeAdults: number,
        @Body('bordeKids') bordeKids: number,
        @Body('bordePrice') bordePrice: string,
        @Body('bordeExtra') bordeExtra: string,
        @Body('bordeDiscount') bordeDiscount: string,
        @Body('bordeTax') bordeTax: string,
        @Body('bordeSubtotal') bordeSubtotal: string,
        @Body('bordeFaci') bordeFaci: Facilities,
    ) {
        return await this.BookingOrderDetailService.UpdateBookingDetail(
            bordeId, bordeCheckin, bordeCheckout, bordeAdults, bordeKids, bordePrice, bordeExtra, bordeDiscount, bordeTax, bordeSubtotal, bordeFaci
        )
    }

    @Delete(':bordeId')
    public async delete(@Param('bordeId') bordeId: number) {
        return await this.BookingOrderDetailService.DeleteBookingDetail(bordeId)
    }
}
