import { Injectable } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminAuthRoleService } from "./role.service";



@ApiTags('Admin权限角色模块')
@Injectable()
export class AdminAuthRoleController {
  constructor(private readonly adminAuthRoleService: AdminAuthRoleService) { }

  async canAccess(roles: string[], ctrl: string, method: string) {
    return await this.adminAuthRoleService.canAccess(roles,ctrl,method);
  }
}
