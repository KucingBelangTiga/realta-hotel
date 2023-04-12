import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Index("usro_user_pk", ["usroUserId"], { unique: true })
@Entity("user_roles", { schema: "users" })
export class UserRoles {
  @Column("integer", { primary: true, name: "usro_user_id" })
  usroUserId: number;

  @ManyToOne(() => Roles, (roles) => roles.userRoles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "usro_role_id", referencedColumnName: "roleId" }])
  usroRole: Roles;

  @OneToOne(() => Users, (users) => users.userRoles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "usro_user_id", referencedColumnName: "userId" }])
  usroUser: Users;
}
