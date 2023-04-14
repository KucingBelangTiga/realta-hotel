/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UploadMiddleware } from 'src/upload-middleware/upload.middleware';
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
            TypeOrmModule.forFeature([
             Department, 
             Employee, 
             EmployeeDepartmentHistory, 
             EmployeePayHistory,
             JobRole, 
             Shift, 
             WorkOrders,
             WorkOrderDetail
            ]),
            MulterModule.register(UploadMiddleware.MulterOption()),
  ],
        controllers:[DepartmentController, EmployeeController, EmployeeDepartmentHistoryController, EmployeePayHistoryController, JobRoleController, ShiftController, WorkOrdersController, WorkOrderDetailController],
        providers: [DepartmentService, EmployeeService, EmployeeDepartmentHistoryService, EmployeePayHistoryService, JobRoleService, ShiftService,  WorkOrdersService, WorkOrderDetailService],
        exports: [DepartmentService, EmployeeService, EmployeeDepartmentHistoryService, EmployeePayHistoryService, JobRoleService, ShiftService,  WorkOrdersService, WorkOrderDetailService]
    }
)

export class HrModule{}
