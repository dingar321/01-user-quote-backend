import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { PostQuoteDto } from "./dto/Post-quote.dto";
import { Quote } from "./entities/quote.entity";

@Injectable()
export class QuoteService{
    constructor(
        @InjectRepository(Quote) private readonly quoteRepository: Repository<Quote>, 
        @InjectRepository(User) private readonly userRepository: Repository<User>,){}


}