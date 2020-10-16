import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppAccountService } from 'src/services/app/account/account.service';


@Injectable()
export class AppAuthService {
  constructor(
    private readonly appAccountService: AppAccountService,
    private readonly jwtService: JwtService
  ) {}


  /**
   * @description 判断用户名是否存在
   * @author haisawaetsu
   * @date 2020/10/16
   * @param {string} username
   * @return {*}  {Promise<any>}
   * @memberof AppAuthService
   */
  async validateUserUsername(username: string): Promise<any> {
    return await this.appAccountService.findOneByUsername(username);
  }

  async login(username: string, password: string) {
    const user = await this.appAccountService.findOneByUsername(username)
    const payload = { username, password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}