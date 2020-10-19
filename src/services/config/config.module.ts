
import { Module } from '@nestjs/common';

import { DatabaseService as ConfigDatabaseService } from './database/database.service';

const mouduleList = [ConfigDatabaseService];

@Module({
  
  providers: [
    // 这是nestjs另外一种Dependency Injection的方式
    {
      // 如果nestjs IoC Container要ConfigService的时候
      provide: ConfigDatabaseService,
      // 回传"这个"值
      // 刚刚的ConfigService要传入.env路径及文件名
      useValue: new ConfigDatabaseService(
        `.env.${process.env.NODE_ENV || 'development'}`,
      ),
    },
  ],
  // export表示这个Module被import后，ConfigService可以被其他Module Inject
  exports: [...mouduleList],
})
export class ConfigModule {}
