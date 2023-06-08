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
import { SpecialOfferService } from '../special_offer/special_offer.service';
import { SpecialOfferCouponsService } from './special_offer_coupons.service';
import { SpecialOffers } from 'output/entities/SpecialOffers';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';

@Controller('special-offer-coupons')
export class SpecialOfferCouponsController {
    constructor(private SpecialOfferCouponService: SpecialOfferCouponsService) { }

    @Get()
    public async getAll() {
        return await this.SpecialOfferCouponService.findAll();
    }

    @Get(':id')
    public async getOne(@Param('id') socoId: number) {
        return await this.SpecialOfferCouponService.findOne(socoId);
    }

    @Post()
    public async create(
        // @Body('socoId') socoId: number,
        @Body('socoSpof') socoSpof: SpecialOffers,
        @Body('socoBorde') socoBorde: BookingOrderDetail,
    ) {
        return await this.SpecialOfferCouponService.createCoupons(
            // socoId, 
            socoSpof, socoBorde)
    }

    @Put(':socoId')
    public async update(
        @Param('socoId') socoId: number,
        @Body('socoSpof') socoSpof: SpecialOffers,
        @Body('socoBorde') socoBorde: BookingOrderDetail,
    ) {
        return await this.SpecialOfferCouponService.updateCoupons(socoId, socoSpof, socoBorde)
    }

    @Delete(':socoId')
    public async delete(@Param('socoId') socoId: number) {
        return await this.SpecialOfferCouponService.deleteCoupons(socoId)
    }
}
