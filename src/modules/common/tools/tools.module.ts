import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';


@Module({
  imports: [],
  controllers: [],
  providers: [ToolsService],
  exports: [ToolsService],
})
export class ToolsModule { }