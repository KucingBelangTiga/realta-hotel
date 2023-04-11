import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';
import { BookingOrders } from 'output/entities/BookingOrders';
import { Hotels } from 'output/entities/Hotels';
import { Repository } from 'typeorm';

@Injectable()
export class BookingOrderService {
    constructor(
        @InjectRepository(BookingOrders) private bookingOrderService: Repository<BookingOrders>,
        @InjectRepository(BookingOrderDetail) private bookingOrderDetailService: Repository<BookingOrderDetail>,
        @InjectRepository(Hotels) private HotelsService: Repository<Hotels>,
    ) { }

    public async findAll() {
        return await this.bookingOrderService.find();
    }

    public async findOne(boorId: number) {
        return await this.bookingOrderService.findOne({ where: { boorId } });
    }

    public async CreateBooking(
        boorId: number,
        boorOrderNumber: string,
        boorOrderDate: Date,
        boorArrivalDate: Date,
        boorTotalRoom: number,
        boorTotalGuest: number,
        boorDiscount: string,
        boorTotalTax: string,
        boorTotalAmount: string,
        boorDownPayment: string,
        boorPayType: string,
        boorIsPaid: string,
        boorType: string,
        boorCardnumber: string,
        boorMemberType: string,
        boorStatus: string,
        bookingOrderDetail: BookingOrderDetail,
        boorHotel: Hotels) {
        try {
            await this.bookingOrderService.save({
                boorId: boorId,
                boorOrderNumber: boorOrderNumber,
                boorOrderDate: boorOrderDate,
                boorArrivalDate: boorArrivalDate,
                boorTotalRoom: boorTotalRoom,
                boorTotalGuest: boorTotalGuest,
                boorDiscount: boorDiscount,
                boorTotalTax: boorTotalTax,
                boorTotalAmount: boorTotalAmount,
                boorDownPayment: boorDownPayment,
                boorPayType: boorPayType,
                boorIsPaid: boorIsPaid,
                boorType: boorType,
                boorCardnumber: boorCardnumber,
                boorMemberType: boorMemberType,
                boorStatus: boorStatus,
                bookingOrderDetail: bookingOrderDetail,
                boorHotel: boorHotel,
            })
        } catch (error) {
            return error.message;
        }
    }
}