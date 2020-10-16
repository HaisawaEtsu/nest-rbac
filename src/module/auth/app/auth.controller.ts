import { Controller, Post, Body } from '@nestjs/common';
import { LoginAuth } from 'src/decorators/customize.decorator';
import { AppAuthService } from './auth.service';

import { LoginAppAuthDto } from './dto/login.app.auth.dto';


@Controller('auth')
export class AppAuthController {
  constructor(private readonly appAuthService: AppAuthService) { }

  @LoginAuth()
  @Post('/login')
  async login(@Body() loginAppAuthDto: LoginAppAuthDto) {
    return this.appAuthService.login(loginAppAuthDto.username, loginAppAuthDto.password);
  }

}