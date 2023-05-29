import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('/')
  public async listStock() {
    return this.employeeService.listEmployee();
  }
}
