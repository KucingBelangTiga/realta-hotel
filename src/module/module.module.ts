import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingOrderService } from '../booking/booking_order/booking_order.service';
import { BookingOrderDetailService } from '../booking/booking_order_detail/booking_order_detail.service';
import { BookingOrderDetailExtraService } from '../booking/booking_order_detail_extra/booking_order_detail_extra.service';
import { UserBreakfeastService } from '../booking/user_breakfeast/user_breakfeast.service';
import { SpecialOfferCouponsService } from '../booking/special_offer_coupons/special_offer_coupons.service';
import { SpecialOfferService } from '../booking/special_offer/special_offer.service';
import { SpecialOfferController } from '../booking/special_offer/special_offer.controller';
import { SpecialOfferCouponsController } from '../booking/special_offer_coupons/special_offer_coupons.controller';
import { UserBreakfeastController } from '../booking/user_breakfeast/user_breakfeast.controller';
import { BookingOrderDetailExtraController } from '../booking/booking_order_detail_extra/booking_order_detail_extra.controller';
import { BookingOrderDetailController } from '../booking/booking_order_detail/booking_order_detail.controller';
import { BookingOrderController } from '../booking/booking_order/booking_order.controller';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';
import { BookingOrderDetailExtra } from 'output/entities/BookingOrderDetailExtra';
import { BookingOrders } from 'output/entities/BookingOrders';
import { UserBreakfeast } from 'output/entities/UserBreakfeast';
import { SpecialOfferCoupons } from 'output/entities/SpecialOfferCoupons';
import { SpecialOffers } from 'output/entities/SpecialOffers';
import { Hotels } from 'output/entities/Hotels';
import { Facilities } from 'output/entities/Facilities';
import { PriceItems } from 'output/entities/PriceItems';
import { HotelService } from 'src/booking/hotel_dev/hotel/hotel.service';
import { HotelController } from 'src/booking/hotel_dev/hotel/hotel.controller';
import { HotelReviews } from 'output/entities/HotelReviews';
import { Entitys } from 'output/entities/Entitys';
import { UserAccounts } from 'output/entities/UserAccounts';
import { CategoryGroup } from 'output/entities/CategoryGroup';

@Module({
    imports: [TypeOrmModule.forFeature([
        //FOR BOOKING
        BookingOrderDetail,
        BookingOrderDetailExtra,
        BookingOrders,
        UserBreakfeast,
        SpecialOfferCoupons,
        SpecialOffers,
        Hotels,
        Facilities,
        PriceItems,
        HotelReviews,
        Entitys,
        UserAccounts,
        CategoryGroup
    ]),
    ],
    providers: [BookingOrderService, BookingOrderDetailService, BookingOrderDetailExtraService, UserBreakfeastService, SpecialOfferCouponsService, SpecialOfferService, HotelService],
    controllers: [SpecialOfferController, SpecialOfferCouponsController, UserBreakfeastController, BookingOrderDetailExtraController, BookingOrderDetailController, BookingOrderController, HotelController],
    exports: [],
})

export class BookingModule { }