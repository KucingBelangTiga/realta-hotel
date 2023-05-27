/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "output/entities/Address";
import { Bank } from "output/entities/Bank";
import { BookingOrderDetail } from "output/entities/BookingOrderDetail";
import { BookingOrderDetailExtra } from "output/entities/BookingOrderDetailExtra";
import { BookingOrders } from "output/entities/BookingOrders";
import { CategoryGroup } from "output/entities/CategoryGroup";
import { Country } from "output/entities/Country";
import { Department } from "output/entities/Department";
import { Employee } from "output/entities/Employee";
import { EmployeeDepartmentHistory } from "output/entities/EmployeeDepartmentHistory";
import { EmployeePayHistory } from "output/entities/EmployeePayHistory";
import { Entitys } from "output/entities/Entitys";
import { Facilities } from "output/entities/Facilities";
import { FacilityPhoto } from "output/entities/FacilityPhoto";
import { FacilityPriceHistory } from "output/entities/FacilityPriceHistory";
import { HotelReviews } from "output/entities/HotelReviews";
import { Hotels } from "output/entities/Hotels";
import { JobRole } from "output/entities/JobRole";
import { Members } from "output/entities/Members";
import { OrderMenuDetail } from "output/entities/OrderMenuDetail";
import { OrderMenus } from "output/entities/OrderMenus";
import { PaymentGateway } from "output/entities/PaymentGateway";
import { PaymentTransaction } from "output/entities/PaymentTransaction";
import { Policy } from "output/entities/Policy";
import { PolicyCategoryGroup } from "output/entities/PolicyCategoryGroup";
import { PriceItems } from "output/entities/PriceItems";
import { Proviences } from "output/entities/Proviences";
import { PurchaseOrderDetail } from "output/entities/PurchaseOrderDetail";
import { PurchaseOrderHeader } from "output/entities/PurchaseOrderHeader";
import { Regions } from "output/entities/Regions";
import { RestoMenuPhotos } from "output/entities/RestoMenuPhotos";
import { RestoMenus } from "output/entities/RestoMenus";
import { Roles } from "output/entities/Roles";
import { ServiceTask } from "output/entities/ServiceTask";
import { Shift } from "output/entities/Shift";
import { SpecialOfferCoupons } from "output/entities/SpecialOfferCoupons";
import { SpecialOffers } from "output/entities/SpecialOffers";
import { StockDetail } from "output/entities/StockDetail";
import { StockPhoto } from "output/entities/StockPhoto";
import { Stocks } from "output/entities/Stocks";
import { UserAccounts } from "output/entities/UserAccounts";
import { UserBonusPoints } from "output/entities/UserBonusPoints";
import { UserBreakfeast } from "output/entities/UserBreakfeast";
import { UserMembers } from "output/entities/UserMembers";
import { UserPassword } from "output/entities/UserPassword";
import { UserRoles } from "output/entities/UserRoles";
import { Users } from "output/entities/Users";
import { Vendor } from "output/entities/Vendor";
import { VendorProduct } from "output/entities/VendorProduct";
import { WorkOrderDetail } from "output/entities/WorkOrderDetail";
import { WorkOrders } from "output/entities/WorkOrders";
import { PurchaseOrderDetailController } from "../purchasing/purchase-order-detail/purchase-order-detail.controller";
import { PurchaseOrderheaderController } from "../purchasing/purchase-orderheader/purchase-orderheader.controller";
import { StockDetailController } from "../purchasing/stock-detail/stock-detail.controller";
import { StockPhotoController } from "../purchasing/stock-photo/stock-photo.controller";
import { StocksController } from "../purchasing/stocks/stocks.controller";
import { VendorController } from "../purchasing/vendor/vendor.controller";
import { VendorProductController } from "../purchasing/vendor-product/vendor-product.controller";
import { FacilityController } from 'src/facility/facility/facility.controller';
import { PurchaseOrderDetailService } from "../purchasing/purchase-order-detail/purchase-order-detail.service";
import { PurchaseOrderheaderService } from "../purchasing/purchase-orderheader/purchase-orderheader.service";
import { StockDetailService } from "../purchasing/stock-detail/stock-detail.service";
import { StockPhotoService } from "../purchasing/stock-photo/stock-photo.service";
import { StocksService } from "../purchasing/stocks/stocks.service";
import { VendorService } from "../purchasing/vendor/vendor.service";
import { VendorProductService } from "../purchasing/vendor-product/vendor-product.service";
import { MulterModule } from '@nestjs/platform-express';
import { UploadMiddleware } from 'src/middleware/upload.middleware';
import { FacilityService } from 'src/facility/facility/facility.service';


@Module(
    {
        imports:[
            TypeOrmModule.forFeature([Address,Bank,BookingOrderDetail,BookingOrderDetailExtra,BookingOrders,CategoryGroup,Country,Department,Employee,EmployeeDepartmentHistory,EmployeePayHistory,Entitys,Facilities,FacilityPhoto,FacilityPriceHistory,HotelReviews,Hotels,JobRole,Members,OrderMenuDetail,OrderMenus,PaymentGateway,PaymentTransaction,Policy,PolicyCategoryGroup,PriceItems,Proviences,PurchaseOrderDetail,PurchaseOrderHeader,Regions,RestoMenuPhotos,RestoMenus,Roles,ServiceTask,Shift,SpecialOfferCoupons,SpecialOffers,StockDetail,StockPhoto,Stocks,UserAccounts,UserBonusPoints,UserBreakfeast,UserMembers,UserPassword,UserRoles,Users,Vendor,VendorProduct,WorkOrderDetail,WorkOrders]),
            MulterModule.register(UploadMiddleware.MulterOption()),
        ],
        controllers:[PurchaseOrderDetailController,PurchaseOrderheaderController,StockDetailController,StockPhotoController,StocksController,VendorController,VendorProductController, FacilityController],
        providers: [PurchaseOrderDetailService, PurchaseOrderheaderService, StockDetailService, StockPhotoService, StocksService, VendorService, VendorProductService, FacilityService],
        exports: [PurchaseOrderDetailService, PurchaseOrderheaderService, StockDetailService, StockPhotoService, StocksService, VendorService, VendorProductService, FacilityService]
    }
)
export class PurchasingModule{}
