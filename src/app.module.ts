import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AuthModule } from './authentication/auth.module';
import { QuoteModuel } from './models/quotes/quote.module';
import { UserModule } from './models/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      validationSchema: Joi.object({
        //Setting all the required settigns from our ".env" file
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
      }),
    }),

    //My modules
    QuoteModuel, UserModule, AuthModule,

    //Database config !
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESS_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRESS_DATABASE,
      autoLoadEntities: true,
      //NOTICE: Disable in production!
      synchronize: true,
    })],
  controllers: [],
  providers: [],
})
export class AppModule { }
