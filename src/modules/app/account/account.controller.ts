import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser, AppLoginAuth } from 'src/decorators/customize.decorator';
import { ObjectType } from 'src/types';
import { AppAccountService } from './account.service';

@ApiTags('APP账号模块')
@ApiBearerAuth()
@Controller()
export class AppAccountController {
  constructor(private readonly appAccountService: AppAccountService) { }
  
  @Get()
  async list(@CurrentUser() userInfo: ObjectType) {
    return userInfo;
  }
  
}