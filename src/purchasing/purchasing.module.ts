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
import { PurchaseOrderDetailController } from "./purchase-order-detail/purchase-order-detail.controller";
import { PurchaseOrderheaderController } from "./purchase-orderheader/purchase-orderheader.controller";
import { StockDetailController } from "./stock-detail/stock-detail.controller";
import { StockPhotoController } from "./stock-photo/stock-photo.controller";
import { StocksController } from "./stocks/stocks.controller";
import { VendorController } from "./vendor/vendor.controller";
import { VendorProductController } from "./vendor-product/vendor-product.controller";
import { PurchaseOrderDetailService } from "./purchase-order-detail/purchase-order-detail.service";
import { PurchaseOrderheaderService } from "./purchase-orderheader/purchase-orderheader.service";
import { StockDetailService } from "./stock-detail/stock-detail.service";
import { StockPhotoService } from "./stock-photo/stock-photo.service";
import { StocksService } from "./stocks/stocks.service";
import { VendorService } from "./vendor/vendor.service";
import { VendorProductService } from "./vendor-product/vendor-product.service";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature([Address,Bank,BookingOrderDetail,BookingOrderDetailExtra,BookingOrders,CategoryGroup,Country,Department,Employee,EmployeeDepartmentHistory,EmployeePayHistory,Entitys,Facilities,FacilityPhoto,FacilityPriceHistory,HotelReviews,Hotels,JobRole,Members,OrderMenuDetail,OrderMenus,PaymentGateway,PaymentTransaction,Policy,PolicyCategoryGroup,PriceItems,Proviences,PurchaseOrderDetail,PurchaseOrderHeader,Regions,RestoMenuPhotos,RestoMenus,Roles,ServiceTask,Shift,SpecialOfferCoupons,SpecialOffers,StockDetail,StockPhoto,Stocks,UserAccounts,UserBonusPoints,UserBreakfeast,UserMembers,UserPassword,UserRoles,Users,Vendor,VendorProduct,WorkOrderDetail,WorkOrders]),
        ],
        controllers:[PurchaseOrderDetailController,PurchaseOrderheaderController,StockDetailController,StockPhotoController,StocksController,VendorController,VendorProductController],
        providers: [PurchaseOrderDetailService, PurchaseOrderheaderService, StockDetailService, StockPhotoService, StocksService, VendorService, VendorProductService],
        exports: [PurchaseOrderDetailService, PurchaseOrderheaderService, StockDetailService, StockPhotoService, StocksService, VendorService, VendorProductService]
    }
)
export class PurchasingModule{}