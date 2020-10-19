import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppLoginAuth } from 'src/decorators/customize.decorator';
import { AppAuthService } from './auth.service';

import { LoginAppAuthDto } from './dto/login.app.auth.dto';

@ApiTags('APP权限模块')
@Controller()
export class AppAuthController {
  constructor(private readonly appAuthService: AppAuthService) { }

  
  @Post('/login')
  @AppLoginAuth()
  @ApiOperation({
    summary: '用户登录',
    description: '用户名可以是手机号码、邮箱、用户名',
  })
  async login(@Body() loginAppAuthDto: LoginAppAuthDto) {
    return this.appAuthService.login(loginAppAuthDto.username, loginAppAuthDto.password);
  }

}