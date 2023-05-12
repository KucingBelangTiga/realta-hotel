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
import { AddressController } from 'src/master/address/address.controller';
import { AddressService } from 'src/master/address/address.service';
import { CategoryGroupController } from 'src/master/category-group/category-group.controller';
import { CategoryGroupService } from 'src/master/category-group/category-group.service';
import { CountryController } from 'src/master/country/country.controller';
import { CountryService } from 'src/master/country/country.service';
import { PolicyController } from 'src/master/policy/policy.controller';
import { PolicyService } from 'src/master/policy/policy.service';
import { PriceItemsController } from 'src/master/price-items/price-items.controller';
import { PriceItemsService } from 'src/master/price-items/price-items.service';
import { ProvincesController } from 'src/master/provinces/provinces.controller';
import { ProvincesService } from 'src/master/provinces/provinces.service';
import { RegionsController } from 'src/master/regions/regions.controller';
import { RegionsService } from 'src/master/regions/regions.service';
import { ServiceTaskController } from 'src/master/service-task/service-task.controller';
import { ServiceTaskService } from 'src/master/service-task/service-task.service';
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
    RegionsService,
    CountryService,
    ProvincesService,
    AddressService,
    PolicyService,
    PriceItemsService,
    ServiceTaskService,
    CategoryGroupService,
  ],
  controllers: [
    RegionsController,
    CountryController,
    ProvincesController,
    AddressController,
    PolicyController,
    PriceItemsController,
    ServiceTaskController,
    CategoryGroupController,
  ],
})
export class ModuleModule {}
