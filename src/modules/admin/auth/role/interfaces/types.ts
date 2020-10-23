import { AdminRoleEntity } from "src/entities/model/admin/role.entity";

export interface IAccessManagement {
  canAccess: (
    roles: AdminRoleEntity[],
    controller: string,
    method: string
  ) => Promise<boolean>;
}