import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AdminAccountEntity } from "src/entities/model/admin/account.entity";
import { AdminRoleName } from "src/enum/admin.role.name.enum";
import { IAccessManagement } from "./interfaces/types";
import { AdminAuthRoleService } from "./role.service";

@Injectable()
export class AdminRolesGuard implements CanActivate {
  constructor(
    @Inject(AdminAuthRoleService) private readonly manager: IAccessManagement,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & {
      user: AdminAccountEntity;
    } = context.switchToHttp().getRequest();
    const { user, method } = request;

    if (!user) {
      return false;
    }
    if (user.roles.some(e=>{
      if(e.name===AdminRoleName.ADMIN_SUPER){
        return true
      }
    })) {
      return true;
    }

    if (!user.roles) {
      return false;
    }

    // const permissions = this.reflector.get<string[]>(
    //   'permissions',
    //   context.getHandler(),
    // );  // TODO

    const ctrl = this.reflector.get<string>("path", context.getClass());
    const result = await this.manager.canAccess(user.roles, ctrl, method);
    return result;
  }
}