import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { QuoteModuel } from './models/quotes/quote.module';
import { UserModule } from './models/users/user.module';

@Module({
  imports: [
    QuoteModuel, UserModule, AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'userquotedb',
      autoLoadEntities: true,

      //Disable in production!
      synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
