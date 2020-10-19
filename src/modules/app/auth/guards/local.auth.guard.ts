import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// 自定义校验
@Injectable()
export class AppLocalAuthGuard extends AuthGuard('local') { }