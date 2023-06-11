import { CategoryGroup } from 'output/entities/CategoryGroup';
import { Hotels } from 'output/entities/Hotels';

export class CreateFacilitesDto {
  faciName: string;
  faciDescription: string;
  faciMaxNumber: number;
  faciMeasureUnit: string;
  faciRoomNumber: string;
  faciStartdate: Date;
  faciEnddate: Date;
  faciLowPrice: string;
  faciHighPrice: string;
  faciRatePrice: string;
  faciDiscount: string;
  faciTaxRate: string;
  faciModifiedDate: Date = new Date();
  faciCagro: CategoryGroup;
  faciHotel: Hotels;
}
