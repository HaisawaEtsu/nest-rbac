import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './services/config/config.module';
import { DatabaseService } from './services/config/database/database.service';
import { TypeOrmService } from './services/config/database/typeorm.service';
import { GlobalAuthGuard } from './guard/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './module/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [
        // 宣告哪个provider或是service需要被注入
        DatabaseService,
      ],
      // 指定用TypeOrmConfigService，作为载入TypeOrmOptions
      // Options就是数据库连接信息等
      useClass: TypeOrmService,
    }),
    ConfigModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      // 设置全局JWT守卫
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
    // {
    //  // 设置全局角色守卫
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // // 全局使用管道(数据校验)
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe
    // },
  ],
})
export class AppModule {}
