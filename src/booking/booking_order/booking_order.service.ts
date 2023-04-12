import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';
import { BookingOrders } from 'output/entities/BookingOrders';
import { Hotels } from 'output/entities/Hotels';
import { Repository } from 'typeorm';

@Injectable()
export class BookingOrderService {
    constructor(
        @InjectRepository(BookingOrders) private boorService: Repository<BookingOrders>,
        @InjectRepository(BookingOrderDetail) private bordetService: Repository<BookingOrderDetail>,
        @InjectRepository(Hotels) private hotelService: Repository<Hotels>,
    ) { }

    public async findAll() {
        return await this.boorService.find();
    }

    public async findOne(boorId: number) {
        return await this.boorService.findOne({ where: { boorId } });
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
            await this.boorService.save({
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
            return 'Data berhasil ditambahkan';
        } catch (error) {
            return error.message;
        }
    }

    public async UpdateBooking(
        boorId: number,
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
        boorHotel: Hotels
    ) {
        try {
            await this.boorService.update(boorId, {
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
            return 'Data berhasil diubah'
        } catch (error) {
            return error.message;
        }
    }

    public async DeleteBooking(boorId: number) {
        try {
            await this.boorService.delete(boorId);
            return 'Data berhasil dihapus'
        } catch (error) {
            return error.message;
        }
    }
}