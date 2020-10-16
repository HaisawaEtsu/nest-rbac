import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppAccountEntity } from './model/app/account.entity';

const entityList = [
  AppAccountEntity
];

@Module({
  imports: [
    TypeOrmModule.forFeature(entityList),
  ],
  exports: [
    TypeOrmModule.forFeature(entityList),
  ],
})
export class EntityModule { }
