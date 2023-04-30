import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'output/entities/Address';
import { Bank } from 'output/entities/Bank';
import { BookingOrderDetail } from 'output/entities/BookingOrderDetail';
import { BookingOrderDetailExtra } from 'output/entities/BookingOrderDetailExtra';
import { BookingOrders } from 'output/entities/BookingOrders';
import { CategoryGroup } from 'output/entities/CategoryGroup';
import { Country } from 'output/entities/Country';
import { Department } from 'output/entities/Department';
import { Employee } from 'output/entities/Employee';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { Entitys } from 'output/entities/Entitys';
import { Facilities } from 'output/entities/Facilities';
import { FacilityPhoto } from 'output/entities/FacilityPhoto';
import { FacilityPriceHistory } from 'output/entities/FacilityPriceHistory';
import { HotelReviews } from 'output/entities/HotelReviews';
import { Hotels } from 'output/entities/Hotels';
import { JobRole } from 'output/entities/JobRole';
import { Members } from 'output/entities/Members';
import { OrderMenuDetail } from 'output/entities/OrderMenuDetail';
import { OrderMenus } from 'output/entities/OrderMenus';
import { PaymentGateway } from 'output/entities/PaymentGateway';
import { PaymentTransaction } from 'output/entities/PaymentTransaction';
import { Policy } from 'output/entities/Policy';
import { PolicyCategoryGroup } from 'output/entities/PolicyCategoryGroup';
import { PriceItems } from 'output/entities/PriceItems';
import { Proviences } from 'output/entities/Proviences';
import { Regions } from 'output/entities/Regions';
import { RestoMenuPhotos } from 'output/entities/RestoMenuPhotos';
import { RestoMenus } from 'output/entities/RestoMenus';
import { ServiceTask } from 'output/entities/ServiceTask';
import { Shift } from 'output/entities/Shift';
import { SpecialOfferCoupons } from 'output/entities/SpecialOfferCoupons';
import { SpecialOffers } from 'output/entities/SpecialOffers';
import { UserAccounts } from 'output/entities/UserAccounts';
import { UserBreakfeast } from 'output/entities/UserBreakfeast';
import { WorkOrderDetail } from 'output/entities/WorkOrderDetail';
import { WorkOrders } from 'output/entities/WorkOrders';
import { FacilitiesController } from 'src/hotel/facilities/facilities.controller';
import { FacilitiesService } from 'src/hotel/facilities/facilities.service';
import { FacilityPhotosController } from 'src/hotel/facility-photos/facility-photos.controller';
import { FacilityPhotosService } from 'src/hotel/facility-photos/facility-photos.service';
import { FacilityPriceHistoryController } from 'src/hotel/facility-price-history/facility-price-history.controller';
import { FacilityPriceHistoryService } from 'src/hotel/facility-price-history/facility-price-history.service';
import { HotelReviewController } from 'src/hotel/hotel-review/hotel-review.controller';
import { HotelReviewService } from 'src/hotel/hotel-review/hotel-review.service';
import { HotelsController } from 'src/hotel/hotels/hotels.controller';
import { HotelsService } from 'src/hotel/hotels/hotels.service';
import { AddressController } from 'src/master/address/address.controller';
import { AddressService } from 'src/master/address/address.service';
import { CategoryGroupController } from 'src/master/category-group/category-group.controller';
import { CategoryGroupService } from 'src/master/category-group/category-group.service';
import { ConfigMulter } from 'src/multer/multer.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Address,
      Bank,
      BookingOrderDetail,
      BookingOrderDetailExtra,
      BookingOrders,
      CategoryGroup,
      Country,
      Department,
      Employee,
      EmployeeDepartmentHistory,
      EmployeePayHistory,
      Entitys,
      Facilities,
      FacilityPhoto,
      FacilityPriceHistory,
      HotelReviews,
      Hotels,
      JobRole,
      Members,
      OrderMenuDetail,
      OrderMenus,
      PaymentGateway,
      PaymentTransaction,
      Policy,
      PolicyCategoryGroup,
      PriceItems,
      Proviences,
      Regions,
      RestoMenuPhotos,
      RestoMenus,
      ServiceTask,
      Shift,
      SpecialOfferCoupons,
      SpecialOffers,
      UserAccounts,
      UserBreakfeast,
      WorkOrderDetail,
      WorkOrders,
    ]),
    MulterModule.register(ConfigMulter.Uploadfiles()),
  ],
  providers: [
    HotelsService,
    FacilitiesService,
    FacilityPriceHistoryService,
    FacilityPhotosService,
    HotelReviewService,
    AddressService,
    CategoryGroupService,
  ],
  controllers: [
    HotelsController,
    FacilitiesController,
    FacilityPriceHistoryController,
    FacilityPhotosController,
    HotelReviewController,
    AddressController,
    CategoryGroupController,
  ],
})
export class ModuleModule {}
