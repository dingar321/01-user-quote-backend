import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetLoggedUserById } from "src/utils/get-user-by-id.decorator";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { PostQuoteDto } from "./dto/Post-quote.dto";
import { Quote } from "./entities/quote.entity";

@Injectable()
export class QuoteService{
    constructor(
        @InjectRepository(Quote) private readonly quoteRepository: Repository<Quote>, 
        @InjectRepository(User) private readonly userRepository: Repository<User>,){}

    //ENDPOINT: /myquotes (Post/update your quote)
    async createQuote(postQuoteDto: PostQuoteDto, userId: number): Promise<User> {
        //Check if quote already exists, if it does the method throws an error
        if ((await this.quoteRepository.findOne({ content: postQuoteDto.content }))){
            throw new ConflictException('Quote with this content already exists');
        }

        //Get the user that is posting the quote
        const foundUser =  await this.userRepository.findOne(userId,{
            relations: ['quote']
        });

        //Check if the user even has a quote
        if(foundUser.quote == null){
            //Creates the quote object for the user
            const postedQuote = this.quoteRepository.create({
                content: postQuoteDto.content,
                upvotes: 0,
            })
            //Gives the qote objec tto the user
            const foundUserAppend = await this.userRepository.preload({
                userid: foundUser.userid,
                quote: postedQuote
            });

            await this.userRepository.save(foundUserAppend);
        }
        else
        {
            //Preloads the already existsing quote
            const postedQuote = await this.quoteRepository.preload({
                quoteid: foundUser.quote.quoteid,
                content: postQuoteDto.content,
                upvotes: foundUser.quote.upvotes,
            })
            await this.quoteRepository.save(postedQuote);
        }

        //return the user and its relation
        return await this.userRepository.findOne(userId,{
            relations: ['quote']
        });
    }
}