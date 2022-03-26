import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //Unwanted and invalid properties
    //when creating new users (registering !)
    whitelist: true,
    //If enabled it will return a bad request
    forbidNonWhitelisted: true,
    transform: true,

  }));
  await app.listen(3000);
}
bootstrap();
