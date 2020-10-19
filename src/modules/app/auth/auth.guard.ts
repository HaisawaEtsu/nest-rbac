import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IAuthGuard } from '@nestjs/passport';
import { AppJwtAuthGuard } from './guards/jwt.auth.guard';
import { AppLocalAuthGuard } from './guards/local.auth.guard';

@Injectable()
export class AppGlobalAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    // 获取登录的注解
    const loginAuth = this.reflector.get<boolean>('app-login-auth', context.getHandler());

    // 在这里取metadata中的no-auth，得到的会是一个bool
    const noAuth = this.reflector.get<boolean>('app-no-auth', context.getHandler());
    if (noAuth) {
      return true;
    }

    const guard = AppGlobalAuthGuard.getAuthGuard(loginAuth);
    // 执行所选策略Guard的canActivate方法
    return guard.canActivate(context);
  }

  // 根据NoAuth的t/f选择合适的策略Guard
  private static getAuthGuard(loginAuth: boolean): IAuthGuard {
    if (loginAuth) {
      return new AppLocalAuthGuard();
    } else {
      return new AppJwtAuthGuard();
    }
  }
}