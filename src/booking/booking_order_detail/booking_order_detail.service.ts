import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';
import { BookingOrders } from 'output/entities/BookingOrders';
import { Facilities } from 'output/entities/Facilities';
import { Hotels } from 'output/entities/Hotels';
import { Repository } from 'typeorm';

@Injectable()
export class BookingOrderDetailService {
    constructor(
        @InjectRepository(BookingOrderDetail) private bordetService: Repository<BookingOrderDetail>,

    ) { }

    public async findAll() {
        return await this.bordetService.find();
    }

    public async findOne(bordeId: number) {
        return await this.bordetService.findOne({ where: { bordeId } });
    }

    public async CreateBookingDetail(
        borderBoorId: number,
        bordeId: number,
        bordeCheckin: Date,
        bordeCheckout: Date,
        bordeAdults: number,
        bordeKids: number,
        bordePrice: string,
        bordeExtra: string,
        bordeDiscount: string,
        bordeTax: string,
        bordeSubtotal: string,
        bordeFaci: Facilities,
    ) {
        try {
            await this.bordetService.save({
                borderBoorId: borderBoorId,
                bordeId: bordeId,
                bordeCheckin: bordeCheckin,
                bordeCheckout: bordeCheckout,
                bordeAdults: bordeAdults,
                bordeKids: bordeKids,
                bordePrice: bordePrice,
                bordeExtra: bordeExtra,
                bordeDiscount: bordeDiscount,
                bordeTax: bordeTax,
                bordeSubtotal: bordeSubtotal,
                bordeFaci: bordeFaci,
            })
            return 'Data booking order detail berhasil ditambakan'
        } catch (error) {
            return error.message;
        }
    }

    public async UpdateBookingDetail(
        bordeId: number,
        bordeCheckin: Date,
        bordeCheckout: Date,
        bordeAdults: number,
        bordeKids: number,
        bordePrice: string,
        bordeExtra: string,
        bordeDiscount: string,
        bordeTax: string,
        bordeSubtotal: string,
        bordeFaci: Facilities,
    ) {
        try {
            await this.bordetService.update(bordeId, {
                bordeCheckin: bordeCheckin,
                bordeCheckout: bordeCheckout,
                bordeAdults: bordeAdults,
                bordeKids: bordeKids,
                bordePrice: bordePrice,
                bordeExtra: bordeExtra,
                bordeDiscount: bordeDiscount,
                bordeTax: bordeTax,
                bordeSubtotal: bordeSubtotal,
                bordeFaci: bordeFaci,
            })
            return 'Data booking order detail berhasil diubah'
        } catch (error) {
            return error.message;
        }
    }

    public async DeleteBookingDetail(bordeId: number) {
        try {
            await this.bordetService.delete(bordeId)
            return 'Data booking order detail berhasil dihapus'
        } catch (error) {
            return error.message;
        }
    }
}
