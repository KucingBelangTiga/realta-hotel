import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { HrModule } from './module/module.module';
// import { DepartmentController } from './hr/department/department.controller';
// import { DepartmentService } from './hr/department/department.service';
// import { EmployeeController } from './hr/employee/employee.controller';
// import { EmployeeService } from './hr/employee/employee.service';
// import { EmployeeDepartmentHistoryController } from './hr/employee_department_history/employee_department_history.controller';
// import { EmployeeDepartmentHistoryService } from './hr/employee_department_history/employee_department_history.service';
// import { EmployeePayHistoryController } from './hr/employee_pay_history/employee_pay_history.controller';
// import { EmployeePayHistoryService } from './hr/employee_pay_history/employee_pay_history.service';
// import { JobRoleController } from './hr/job_role/job_role.controller';
// import { JobRoleService } from './hr/job_role/job_role.service';
// import { ShiftController } from './hr/shift/shift.controller';
// import { ShiftService } from './hr/shift/shift.service';
// import { WorkOrderDetailController } from './hr/work_order_detail/work_order_detail.controller';
// import { WorkOrderDetailService } from './hr/work_order_detail/work_order_detail.service';
// import { WorkOrdersController } from './hr/work_orders/work_orders.controller';
// import { WorkOrdersService } from './hr/work_orders/work_orders.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'RealtaHotel',
      entities: ['dist/output/entities/*.js'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    HrModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
