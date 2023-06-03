import { Proviences } from 'output/entities/Proviences';

export class CreateAddressDto {
  addrLine1: string;
  addrLine2: string;
  addrPostalCode: string;
  addrProv: Proviences;
}
