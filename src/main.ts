import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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


  //Setup for "Swagger" testing
  const config = new DocumentBuilder()
    .setTitle('01-user-quote')
    .setDescription('The first project in the "SkillUp Mentor" program')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  
  await app.listen(3000);
}
bootstrap();
