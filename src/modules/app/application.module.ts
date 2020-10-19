import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppAccountModule } from './account/account.module';
import { AppGlobalAuthGuard } from './auth/auth.guard';
import { AppAuthModule } from './auth/auth.module';

const moduleList = [
  AppAuthModule,
  AppAccountModule
]

@Module({
  imports: [
    ...moduleList
  ],
  providers: [
    {
      // 设置app接口全局JWT守卫
      provide: APP_GUARD,
      useClass: AppGlobalAuthGuard,
    },
  ],
  exports: [
    ...moduleList
  ],
  controllers: []
})
export class ApplicationModule { }
