import { Module } from '@nestjs/common';
import { ToolsModule } from './tools/tools.module';

const moduleList = [
  ToolsModule
]

@Module({
  imports: [
    ...moduleList
  ],
  exports: [
    ...moduleList
  ],
  controllers: []
})
export class CommonModule { }
