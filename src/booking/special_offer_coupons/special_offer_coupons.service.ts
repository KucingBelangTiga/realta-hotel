import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';
import { SpecialOfferCoupons } from 'output/entities/SpecialOfferCoupons';
import { SpecialOffers } from 'output/entities/SpecialOffers';
import { Repository } from 'typeorm';


@Injectable()
export class SpecialOfferCouponsService {
    constructor(
        @InjectRepository(SpecialOfferCoupons) private socoService: Repository<SpecialOfferCoupons>
    ) { }

    public async findAll() {
        return await this.socoService.find();
    }

    public async findOne(socoId: number) {
        return await this.socoService.findOne({ where: { socoId } });
    }

    public async createCoupons(
        socoId: number,
        socoSpof: SpecialOffers,
        socoBorde: BookingOrderDetail,
    ) {
        try {
            await this.socoService.save({
                socoId: socoId,
                socoSpof: socoSpof,
                socoBorde: socoBorde,
            });
            return 'data untuk special offer coupon telah berhasil ditambahkan';
        } catch (error) {
            return error.message;
        }
    }

    public async updateCoupons(
        socoId: number,
        socoSpof: SpecialOffers,
        socoBorde: BookingOrderDetail,
    ) {
        try {
            await this.socoService.update(socoId, {
                socoSpof: socoSpof,
                socoBorde: socoBorde,
            })
            return 'data untuk special offer coupon telah berhasil diubah';
        } catch (error) {
            return error.message;
        }
    }

    public async deleteCoupons(socoId: number) {
        try {
            await this.socoService.delete(socoId);
            return 'data yang dipilih di special offer telah berhasil dihapus';
        } catch (error) {
            return error.message;
        }
    }
}
