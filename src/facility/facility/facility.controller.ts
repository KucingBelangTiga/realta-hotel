import { Controller, Get } from '@nestjs/common';
import { FacilityService } from './facility.service';
@Controller('facility')
export class FacilityController {
  constructor(private FacilitesService: FacilityService) {}
  @Get('/')
  public async listFacility() {
    return await this.FacilitesService.listFacility();
  }
}
