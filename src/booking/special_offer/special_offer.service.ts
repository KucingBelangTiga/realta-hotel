import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';
import { BookingOrderDetailExtra } from 'output/entities/BookingOrderDetailExtra';
import { BookingOrders } from 'output/entities/BookingOrders';
import { Facilities } from 'output/entities/Facilities';
import { Hotels } from 'output/entities/Hotels';
import { PriceItems } from 'output/entities/PriceItems';
import { SpecialOffers } from 'output/entities/SpecialOffers';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialOfferService {
    constructor(
        @InjectRepository(SpecialOffers) private spofService: Repository<SpecialOffers>
    ) { }

    public async findAll() {
        return await this.spofService.find();
    }

    public async findOne(spofId: number) {
        return await this.spofService.findOne({ where: { spofId } });
    }

    public async CreateSpecialOffer(
        spofId: number,
        spofName: string,
        spofDescription: string,
        spofType: string,
        spofDiscount: string,
        spofStartDate: Date,
        spofEndDate: Date,
        spofMinQty: number,
        spofMaxQty: number,
        spofModifiedDate: Date,
    ) {
        try {
            await this.spofService.save({
                spofId: spofId,
                spofName: spofName,
                spofDescription: spofDescription,
                spofType: spofType,
                spofDiscount: spofDiscount,
                spofStartDate: spofStartDate,
                spofEndDate: spofEndDate,
                spofMinQty: spofMinQty,
                spofMaxQty: spofMaxQty,
                spofModifiedDate: spofModifiedDate,
            })
            return 'Data pada special offer berhasil ditambah';
        } catch (error) {
            return error.message;
        }
    }

    public async UpdateSpecialOffer(
        spofId: number,
        spofName: string,
        spofDescription: string,
        spofType: string,
        spofDiscount: string,
        spofStartDate: Date,
        spofEndDate: Date,
        spofMinQty: number,
        spofMaxQty: number,
        spofModifiedDate: Date,
    ) {
        try {
            await this.spofService.update(spofId, {
                spofName: spofName,
                spofDescription: spofDescription,
                spofType: spofType,
                spofDiscount: spofDiscount,
                spofStartDate: spofStartDate,
                spofEndDate: spofEndDate,
                spofMinQty: spofMinQty,
                spofMaxQty: spofMaxQty,
                spofModifiedDate: spofModifiedDate,
            })
            return 'Data pada special offer berhasil diubah';
        } catch (error) {
            return error.message;
        }
    }

    public async DeleteSpecialOffer(spofId: number) {
        try {
            await this.spofService.delete(spofId)
            return 'Data pada special offer berhasil dihapus';
        } catch (error) {
            return error.message;
        }
    }
}
