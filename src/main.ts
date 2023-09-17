import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 유효성 검사 실패시 Validate에 도달하지않음
      forbidNonWhitelisted: true, // 잘못된 형식은 Request 자체를 하지않음
      transform: true, // path parameter에 대한 타입 추론이 가능해짐
    }),
  );
  await app.listen(3000);
}
bootstrap();
