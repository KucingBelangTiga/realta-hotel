/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UploadMiddleware } from 'src/upload-middleware/upload.middleware';
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

@Module(
    {
        imports: [
            TypeOrmModule.forFeature([Address,Bank,BookingOrderDetail,BookingOrderDetailExtra,BookingOrders,CategoryGroup,Country,Department,Employee,EmployeeDepartmentHistory,EmployeePayHistory,Entitys,Facilities,FacilityPhoto,FacilityPriceHistory,HotelReviews,Hotels,JobRole,Members,OrderMenuDetail,OrderMenus,PaymentGateway,PaymentTransaction,Policy,PolicyCategoryGroup,PriceItems,Proviences,Regions,RestoMenuPhotos,RestoMenus,ServiceTask,Shift,SpecialOfferCoupons,SpecialOffers,UserAccounts,UserBreakfeast,WorkOrderDetail,WorkOrders, PurchaseOrderDetail,PurchaseOrderHeader,Roles,StockDetail,StockPhoto,Stocks,UserBonusPoints,UserMembers,UserPassword,UserRoles,Users,Vendor,VendorProduct]),
            MulterModule.register({
                dest: './uploads',
              }), 
  ],
        controllers:[DepartmentController, EmployeeController, EmployeeDepartmentHistoryController, EmployeePayHistoryController, JobRoleController, ShiftController, WorkOrdersController, WorkOrderDetailController],
        providers: [DepartmentService, EmployeeService, EmployeeDepartmentHistoryService, EmployeePayHistoryService, JobRoleService, ShiftService,  WorkOrdersService, WorkOrderDetailService],
        exports: [DepartmentService, EmployeeService, EmployeeDepartmentHistoryService, EmployeePayHistoryService, JobRoleService, ShiftService,  WorkOrdersService, WorkOrderDetailService]
    }
)

export class HrModule{}
