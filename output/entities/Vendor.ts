import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PurchaseOrderHeader } from "./PurchaseOrderHeader";
import { VendorProduct } from "./VendorProduct";

@Index("vendor_id_pk", ["vendorId"], { unique: true })
@Entity("vendor", { schema: "purchasing" })
export class Vendor {
  @PrimaryGeneratedColumn({ type: "integer", name: "vendor_id" })
  vendorId: number;

  @Column("character varying", {
    name: "vendor_name",
    nullable: true,
    length: 55,
  })
  vendorName: string | null;

  @Column("integer", { name: "vendor_active", nullable: true })
  vendorActive: number | null;

  @Column("integer", { name: "vendor_priority", nullable: true })
  vendorPriority: number | null;

  @Column("date", { name: "vendor_register_date", nullable: true })
  vendorRegisterDate: string | null;

  @Column("character varying", {
    name: "vendor_weburl",
    nullable: true,
    length: 1024,
  })
  vendorWeburl: string | null;

  @Column("timestamp without time zone", {
    name: "vendor_modified_date",
    nullable: true,
  })
  vendorModifiedDate: Date | null;

  @OneToMany(
    () => PurchaseOrderHeader,
    (purchaseOrderHeader) => purchaseOrderHeader.poheVendor
  )
  purchaseOrderHeaders: PurchaseOrderHeader[];

  @OneToMany(() => VendorProduct, (vendorProduct) => vendorProduct.veproVendor)
  vendorProducts: VendorProduct[];
}
