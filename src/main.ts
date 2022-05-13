import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { number } from 'joi';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,

  }));



  //Setup for "Swagger" testing


  const config = new DocumentBuilder()
    .setTitle('01-user-quote')
    .setDescription
    (
      'The first project in the "SkillUp Mentor" program'
    )
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
      'jwtToken')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });


  //Access-Control-Allow-Origin
  var cors = require('cors');
  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }));


  await app.listen(process.env.APP_PORT);
}
bootstrap();
