/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalGuard } from 'src/auth/local.strategy';
import { JwtGuard } from 'src/auth/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { UploadMiddleware } from 'src/upload-middleware/upload.middleware';
import { ConfigMulter } from 'src/multer/multer.middleware';
import { Address } from "output/entities/Address";
import { Bank } from "output/entities/Bank";
import { BookingOrderDetail } from "output/entities/BookingOrderDetail";
import { BookingOrderDetailExtra } from "output/entities/BookingOrderDetailExtra";
import { BookingOrders } from "output/entities/BookingOrders";
import { CategoryGroup } from "output/entities/CategoryGroup";
import { Country } from "output/entities/Country";
import { Entitys } from "output/entities/Entitys";
import { Facilities } from "output/entities/Facilities";
import { FacilityPhoto } from "output/entities/FacilityPhoto";
import { FacilityPriceHistory } from "output/entities/FacilityPriceHistory";
import { HotelReviews } from "output/entities/HotelReviews";
import { Hotels } from "output/entities/Hotels";
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
import { Department } from "output/entities/Department";
import { Employee } from "output/entities/Employee";
import { EmployeeDepartmentHistory } from "output/entities/EmployeeDepartmentHistory";
import { EmployeePayHistory } from "output/entities/EmployeePayHistory";
import { JobRole } from "output/entities/JobRole";
import { Shift } from "output/entities/Shift";
import { WorkOrders } from "output/entities/WorkOrders";
import { WorkOrderDetail } from "output/entities/WorkOrderDetail";
import { UserProfiles } from 'output/entities/UserProfiles';
import { DepartmentController } from 'src/hr/department/department.controller';
import { EmployeeController } from 'src/hr/employee/employee.controller';
import { EmployeeDepartmentHistoryController } from 'src/hr/employee_department_history/employee_department_history.controller';
import { EmployeePayHistoryController } from 'src/hr/employee_pay_history/employee_pay_history.controller';
import { JobRoleController } from 'src/hr/job_role/job_role.controller';
import { ShiftController } from 'src/hr/shift/shift.controller';
import { WorkOrdersController } from 'src/hr/work_orders/work_orders.controller';
import { WorkOrderDetailController } from 'src/hr/work_order_detail/work_order_detail.controller';
import { DepartmentService } from 'src/hr/department/department.service';
import { EmployeeService } from 'src/hr/employee/employee.service';
import { EmployeeDepartmentHistoryService } from 'src/hr/employee_department_history/employee_department_history.service';
import { EmployeePayHistoryService } from 'src/hr/employee_pay_history/employee_pay_history.service';
import { JobRoleService } from 'src/hr/job_role/job_role.service';
import { ShiftService } from 'src/hr/shift/shift.service';
import { WorkOrdersService } from 'src/hr/work_orders/work_orders.service';
import { WorkOrderDetailService } from 'src/hr/work_order_detail/work_order_detail.service';
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
import { RolesService } from 'src/users/roles/roles.service';
import { RolesController } from 'src/users/roles/roles.controller';
import { UsersService } from 'src/users/users/users.service';
import { UsersController } from 'src/users/users/users.controller';
import { UserRolesService } from 'src/users/user-roles/user-roles.service';
import { UserRolesController } from 'src/users/user-roles/user-roles.controller';
import { UserBonusPointsService } from 'src/users/user-bonus-points/user-bonus-points.service';
import { UserBonusPointsController } from 'src/users/user-bonus-points/user-bonus-points.controller';
import UserPasswordService from 'src/users/user-password/user-password.service';
import { UserPasswordController } from 'src/users/user-password/user-password.controller';
import { UserMembersService } from 'src/users/user-members/user-members.service';
import { UserMembersController } from 'src/users/user-members/user-members.controller';
import { UserProfilesService } from 'src/users/user-profiles/user-profiles.service';
import { UserProfilesController } from 'src/users/user-profiles/user-profiles.controller';
import { UserController } from 'src/users/user/user.controller';
import { UserService } from 'src/users/user/user.service';

@Module(
    {
        imports: [
            TypeOrmModule.forFeature([Address,Bank,BookingOrderDetail,BookingOrderDetailExtra,BookingOrders,CategoryGroup,Country,Department,Employee,EmployeeDepartmentHistory,EmployeePayHistory,Entitys,Facilities,FacilityPhoto,FacilityPriceHistory,HotelReviews,Hotels,JobRole,Members,OrderMenuDetail,OrderMenus,PaymentGateway,PaymentTransaction,Policy,PolicyCategoryGroup,PriceItems,Proviences,Regions,RestoMenuPhotos,RestoMenus,ServiceTask,Shift,SpecialOfferCoupons,SpecialOffers,UserAccounts,UserBreakfeast,WorkOrderDetail,WorkOrders, PurchaseOrderDetail,PurchaseOrderHeader,Roles,StockDetail,StockPhoto,Stocks,UserBonusPoints,UserMembers,UserPassword,UserRoles,Users, UserProfiles,Vendor,VendorProduct]),
            // MulterModule.register(UploadMiddleware.MulterOption()),
            MulterModule.register({
                dest: './uploads',
              }), 
            PassportModule,
            JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '2d' },
    }),
            MulterModule.register(ConfigMulter.Uploadfiles()),
  ],
        controllers:[DepartmentController, EmployeeController, EmployeeDepartmentHistoryController, EmployeePayHistoryController, JobRoleController, ShiftController, WorkOrdersController, WorkOrderDetailController,
            RegionsController,
            CountryController,
            ProvincesController,
            AddressController,
            PolicyController,
            PriceItemsController,
            ServiceTaskController,
            CategoryGroupController,
            HotelsController,
            FacilitiesController,
            FacilityPriceHistoryController,
            FacilityPhotosController,
            HotelReviewController,
            RolesController,
            UsersController,
            UserRolesController,
            UserBonusPointsController,
            UserPasswordController,
            UserMembersController,
            UserProfilesController,
            UserController,
          ],
        providers: [DepartmentService, EmployeeService, EmployeeDepartmentHistoryService, EmployeePayHistoryService, JobRoleService, ShiftService,  WorkOrdersService, WorkOrderDetailService,
            RegionsService,
            CountryService,
            ProvincesService,
            AddressService,
            PolicyService,
            PriceItemsService,
            ServiceTaskService,
            CategoryGroupService,
            HotelsService,
            FacilitiesService,
            FacilityPriceHistoryService,
            FacilityPhotosService,
            HotelReviewService,
            RolesService,
            UsersService,
            UserRolesService,
            UserBonusPointsService,
            UserPasswordService,
            UserMembersService,
            UserProfilesService,
            UserService,
            LocalGuard,
            JwtGuard,
        ],
        exports: [DepartmentService, EmployeeService, EmployeeDepartmentHistoryService, EmployeePayHistoryService, JobRoleService, ShiftService,  WorkOrdersService, WorkOrderDetailService, 
            UserService, ]
    }
)

export class HrModule{}
