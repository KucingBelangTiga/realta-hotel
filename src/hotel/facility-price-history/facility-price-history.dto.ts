import { Facilities } from 'output/entities/Facilities';

export class CreateFacilityPriceHistoryDto {
  faphStartdate: Date;
  faphEnddate: Date;
  faphLowPrice: string;
  faphHighPrice: string;
  faphRatePrice: string;
  faphDiscount: string;
  faphTaxRate: string;
  faphUserId: number;
  faphModifiedDate: Date = new Date();
  faphFaci: Facilities;
}
