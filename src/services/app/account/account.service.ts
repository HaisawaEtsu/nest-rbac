/*
 * @Descripttion: 
 * @version: 
 * @Author: haisawaetsu
 * @Date: 2020-10-16 14:00:53
 * @LastEditors: haisawaetsu
 * @LastEditTime: 2020-10-16 14:17:43
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppAccountEntity } from 'src/entities/model/app/account.entity';
import { Repository } from 'typeorm';

export type Account = any;

@Injectable()
export class AppAccountService {
  constructor (
    @InjectRepository(AppAccountEntity)
    private readonly appAccountRepository: Repository<AppAccountEntity>
  ) {}

  
  /**
   * @description 根据用户名查用户
   * @author haisawaetsu
   * @date 2020/10/16
   * @param {string} username
   * @return {*}  
   * @memberof AppAccountService
   */
  async findOneByUsername(username: string) {
    return await this.appAccountRepository.findOne({ where: { username: username } });
  }
}
