import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'output/entities/Employee';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private EmployeeRepo: Repository<Employee>,
  ) {}

  public async listEmployee() {
    try {
      const response = await this.EmployeeRepo.find();
      return response;
    } catch (error) {
      throw new Error(`terjadi kesalahan di list Employee, ${error.message}`);
    }
  }
}
