import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";

import { Quote } from "./entities/quote.entity";
import { QuoteController } from "./quote.controller";
import { QuoteService } from "./quote.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([Quote]),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [QuoteController],
    providers: [QuoteService],
})
export class QuoteModuel{}