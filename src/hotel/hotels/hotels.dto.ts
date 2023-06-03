import { Address } from 'output/entities/Address';

export class CreateHotelsDto {
  hotelName: string;
  hotelDescription: string;
  hotelRatingStar: number;
  hotelPhonenumber: string;
  hotelAddr: Address;
  hotelModifiedDate: Date = new Date();
}
