import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppAccountService } from './account.service';
import { AppAccountController } from './account.controller';
import { AppAccountEntity } from 'src/entities/model/app/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppAccountEntity])],
  controllers: [AppAccountController],
  providers: [AppAccountService],
  exports: [AppAccountService],
})
export class AppAccountModule { }