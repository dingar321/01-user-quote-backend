import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetLoggedUserById } from "src/utils/get-user-by-id.decorator";
import { Repository } from "typeorm";
import { runInThisContext } from "vm";
import { User } from "../users/entities/user.entity";
import { CreateQuoteDto } from "./dto/create-quote.dto";
import { Quote } from "./entities/quote.entity";

@Injectable()
export class QuoteService{
    constructor(
        @InjectRepository(Quote) private readonly quoteRepository: Repository<Quote>, 
        @InjectRepository(User) private readonly userRepository: Repository<User>,){}


    //ENDPOINT: /myquotes (Post/update your quote)
    async createQuote(createQuoteDto: CreateQuoteDto, userId: number){
        //Check if quote already exists, if it does the method throws an error
        if ((await this.quoteRepository.findOne({ content: createQuoteDto.content }))){
            throw new ConflictException('This quote already exists');
        }

        //Creates the object quote and saves it in the database
        const postedQuote = this.quoteRepository.create({
            content: createQuoteDto.content,
            upvotes: 0,
        })
        await this.quoteRepository.save(postedQuote);

        //Gets the user that posted the quote 
        const loggedUser = await this.userRepository.preload({
            userid: +userId,
            quote: postedQuote
        });
        await this.userRepository.save(loggedUser);


    }

}