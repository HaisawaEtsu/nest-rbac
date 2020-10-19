import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common'

/**
* 接口不用验证
*/
export const AppNoAuth = () => SetMetadata('app-no-auth', true);

/**
* 登录认证
*/
export const AppLoginAuth = () => SetMetadata('app-login-auth', true);

/**
* 某个角色能访问
*/
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

/**
* 当前登录的User
*/
export const CurrentUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (data && request.user) {
    return request.user[data];
  } else {
    return request.user;
  }
});