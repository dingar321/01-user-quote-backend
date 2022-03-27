import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';
import { AuthModule } from './authentication/auth.module';
import { QuoteModuel } from './models/quotes/quote.module';
import { UserModule } from './models/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/enviroment/.env',
      ignoreEnvFile: false,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
      }),
    }),
    QuoteModuel, UserModule, AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESS_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: 'pass123',
      database: process.env.POSTGRESS_DATABASE,
      autoLoadEntities: true,
      //NOTICE: Disable in production!
      synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
