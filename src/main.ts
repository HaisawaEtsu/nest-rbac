import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as requestIp from 'request-ip';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DatabaseService } from './services/config/database/database.service';
import { Logger, ValidationPipe } from '@nestjs/common';

const databaseService = new DatabaseService(
  `.env.${process.env.NODE_ENV || 'development'}`,
)
const PORT = Number(databaseService.get('PORT')) || 8080;
const PREFIX = databaseService.get('PREFIX') || '';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enables CORS
  app.enableCors();

  // 给请求添加prefix 如/api/v1
  app.setGlobalPrefix(PREFIX);

  // swagger相关配置
  const options = new DocumentBuilder()
    .setTitle('nest-rbac api document')
    .setDescription('nest-rbac api document')

    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'Authentication' })
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${PREFIX}/docs`, app, document);

  // 全局使用限速(防止暴力攻击)
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 500, // limit each IP to 500 requests per windowMs
    }),
  );

  // web漏洞修复，防止XSS攻击
  app.use(helmet())

  // 全局范围内使用异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局使用超时拦截
  app.useGlobalInterceptors(new TimeoutInterceptor());

  // 获取ip地址
  app.use(requestIp.mw());

  await app.listen(PORT, () => {
    Logger.log(`服务已经启动,请访问:http://wwww.localhost:${PORT}/${PREFIX}`);
  });
  
  // 热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
