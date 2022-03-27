import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quote } from "../quotes/entities/quote.entity";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([Quote]),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController], 
    providers: [UserService],
})
export class UserModule{}