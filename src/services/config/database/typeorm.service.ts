import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { DatabaseService } from './database.service';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
// 需要实现TypeOrmOptionsFactory
export class TypeOrmService implements TypeOrmOptionsFactory {
  // 注入config service取得env变量
  constructor(private readonly configService: DatabaseService) {}
  // 就是回传TypeOrmOptions对象
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql', // configService.get('DB_TYPE') as DatabaseType,
      host: this.configService.get('DB_HOST'),
      port: Number(this.configService.get('DB_PORT')),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      synchronize: this.configService.get('DB_SYNCHRONIZE') === 'true',
      logging: this.configService.get('DB_LOGGING') === 'true',
      entities: [
        join(__dirname, '../../../entities/**/**/*.entity.{ts,js}'),
        join(__dirname, '../../../entities/**/*.entity.{ts,js}')
      ],
      migrations: [
        join(__dirname, '../../../migration/**/**/*.{ts,js}'),
      ],
      subscribers: [
        join(__dirname, '../../../subscriber/**/**/*.{ts,js}'),
      ],
      cli: {
        'entitiesDir': join(__dirname, '../../../entities'),
        'migrationsDir': join(__dirname, '../../../migration'),
        'subscribersDir': join(__dirname, '../../../subscriber'),
      }
    };
  }
}
