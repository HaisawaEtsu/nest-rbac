import { Module } from '@nestjs/common';
import { AdminAuthRoleModule } from './role/role.module';

@Module({
  imports: [
    AdminAuthRoleModule
  ],
})
export class AdminAuthModule {}
