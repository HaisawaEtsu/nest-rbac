import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AdminAuthModule } from './auth/auth.module';
import { AdminRolesGuard } from './auth/role/roles.guard';

const moduleList = [
  AdminAuthModule
]

@Module({
  imports: [
    ...moduleList
  ],
  providers: [
    {
      // 设置admin接口全局角色守卫
      provide: APP_GUARD,
      useClass: AdminRolesGuard,
    },
  ],
  exports: [
    ...moduleList
  ],
  controllers: []
})
export class AdminModule { }
