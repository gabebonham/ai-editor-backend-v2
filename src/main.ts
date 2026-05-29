import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/response.interceptor';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
