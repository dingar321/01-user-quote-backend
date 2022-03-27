import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quote } from "src/models/quotes/entities/quote.entity";
import { User } from "src/models/users/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";


//TESTING PURPOSES: 
//https://jwt.io/

@Module({
    imports:[TypeOrmModule.forFeature([User]),
    JwtModule.register({
        //secret: process.env.JWT_TOKEN_SECRET,
        secret: 'D1FBED8EAEB7E37694B42C0BB7B4B93B275A44DB66436DBFEAE6D89BF80C57D5',
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule{}