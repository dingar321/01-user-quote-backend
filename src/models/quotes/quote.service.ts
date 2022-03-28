import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetLoggedUserById } from "src/utils/get-user-by-id.decorator";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { CreateQuoteDto } from "./dto/create-quote.dto";
import { PostQuoteDto } from "./dto/Post-quote.dto";
import { Quote } from "./entities/quote.entity";

@Injectable()
export class QuoteService{
    constructor(
        @InjectRepository(Quote) private readonly quoteRepository: Repository<Quote>, 
        @InjectRepository(User) private readonly userRepository: Repository<User>,){}

    //ENDPOINT: /myquotes (Post/update your quote)
    async createQuote(postQuoteDto: PostQuoteDto, userId: number){

        //Check if quote already exists, if it does the method throws an error
        if ((await this.quoteRepository.findOne({ content: postQuoteDto.content }))){
            throw new ConflictException('Quote with this content already exists');
        }
        //Creates the object quote
        const postedQuote = this.quoteRepository.create({
            content: postQuoteDto.content,
            upvotes: 0,
        })

        //First we try to find the users quote
        const quoteAlreadyPosted = await this.quoteRepository.findOne({ quoteid: postedQuote.quoteid});
        
        //If the user already made a quote before
        if (quoteAlreadyPosted){
            //sets the user's quote to null
            const loggedUser = await this.userRepository.preload({
                userid: +userId,
                quote: null
            });
        }

        //Saves the new quote 
        await this.quoteRepository.save(postedQuote);
        //Gets the user that posted the quote and adds the quote 
        const loggedUser = await this.userRepository.preload({
            userid: +userId,
            quote: postedQuote
        });
        //Then saves the user
        await this.userRepository.save(loggedUser);
        //After the querys it returns the user and its relation:

        //removes previous quote
        await this.quoteRepository.remove(await this.quoteRepository.findOne({
            where: {
                quoteid: loggedUser.quote.quoteid- 1
            }
        }));

        //Return user to see changes
        return loggedUser;
    }
}