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
import { BookingOrderService } from './booking_order.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';
import { Hotels } from 'output/entities/Hotels';

@Controller('/booking-order')
export class BookingOrderController {
    constructor(private BookingOrderServices: BookingOrderService) { }

    @Get()
    public async getAll() {
        return await this.BookingOrderServices.findAll();
    }

    @Get(':id')
    public async getOne(@Param('id') boorId: number) {
        return await this.BookingOrderServices.findOne(boorId);
    }

    @Post()
    public async Create(@Body('boorId') boorId: number,
        @Body('boorOrderNumber') boorOrderNumber: string,
        @Body('boorOrderDate') boorOrderDate: Date,
        @Body('boorArrivalDate') boorArrivalDate: Date,
        @Body('boorTotalRoom') boorTotalRoom: number,
        @Body('boorTotalGuest') boorTotalGuest: number,
        @Body('boorDiscount') boorDiscount: string,
        @Body('boorTotalTax') boorTotalTax: string,
        @Body('boorTotalAmount') boorTotalAmount: string,
        @Body('boorDownPayment') boorDownPayment: string,
        @Body('boorPayType') boorPayType: string,
        @Body('boorIsPaid') boorIsPaid: string,
        @Body('boorType') boorType: string,
        @Body('boorCardnumber') boorCardnumber: string,
        @Body('boorMemberType') boorMemberType: string,
        @Body('boorStatus') boorStatus: string,
        @Body('bookingOrderDetail') bookingOrderDetail: BookingOrderDetail,
        @Body('boorHotel') boorHotel: Hotels) {
        return await this.BookingOrderServices.CreateBooking(boorId, boorOrderNumber, boorOrderDate, boorArrivalDate, boorTotalRoom, boorTotalGuest, boorDiscount, boorTotalTax, boorTotalAmount, boorDownPayment, boorPayType, boorIsPaid, boorType, boorCardnumber, boorMemberType, boorStatus, bookingOrderDetail, boorHotel);
    }
}
