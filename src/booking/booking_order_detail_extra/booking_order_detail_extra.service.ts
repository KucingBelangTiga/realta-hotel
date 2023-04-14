import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';
import { BookingOrderDetailExtra } from 'output/entities/BookingOrderDetailExtra';
import { BookingOrders } from 'output/entities/BookingOrders';
import { Facilities } from 'output/entities/Facilities';
import { Hotels } from 'output/entities/Hotels';
import { PriceItems } from 'output/entities/PriceItems';
import { Repository } from 'typeorm';

@Injectable()
export class BookingOrderDetailExtraService {
    constructor(
        @InjectRepository(BookingOrderDetailExtra) private boexService: Repository<BookingOrderDetailExtra>,
    ) { }

    public async findAll() {
        return await this.boexService.find();
    }

    public async findOne(boexId: number) {
        return await this.boexService.findOne({ where: { boexId } });
    }

    public async CreateBoEx(
        boexId: number,
        boexPrice: string,
        boexQty: number,
        boexSubtotal: string,
        boexMeasureUnit: string,
        boexPrit: PriceItems,
        boexBorde: BookingOrderDetail,
    ) {
        try {
            await this.boexService.save({
                boexId: boexId,
                boexPrice: boexPrice,
                boexQty: boexQty,
                boexSubtotal: boexSubtotal,
                boexMeasureUnit: boexMeasureUnit,
                boexPrit: boexPrit,
                boexBorde: boexBorde,
            })
            return 'Data untuk booking order detail extra berhasil ditambahkan'
        } catch (error) {
            return error.message;
        }
    }

    public async UpdateBoEx(
        boexId: number,
        boexPrice: string,
        boexQty: number,
        boexSubtotal: string,
        boexMeasureUnit: string,
        boexPrit: PriceItems,
        boexBorde: BookingOrderDetail,
    ) {
        try {
            await this.boexService.update(boexId, {
                boexPrice: boexPrice,
                boexQty: boexQty,
                boexSubtotal: boexSubtotal,
                boexMeasureUnit: boexMeasureUnit,
                boexPrit: boexPrit,
                boexBorde: boexBorde,
            })
            return 'Data untuk booking order detail extra berhasil diubah'
        } catch (error) {
            return error.message;
        }
    }

    public async DeleteBoEx(boexId: number) {
        try {
            await this.boexService.delete({ boexId })
            return 'Data untuk booking order detail extra berhasil dihapus'
        } catch (error) {
            return error.message;
        }
    }
}
