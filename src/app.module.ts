import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigService } from '@nestjs/config';
import { ConfigModule } from './services/config/config.module';
import { DatabaseService } from './services/config/database/database.service';
import { TypeOrmService } from './services/config/database/typeorm.service';
// import ConfigDatabase from './config/config.database'

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
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
