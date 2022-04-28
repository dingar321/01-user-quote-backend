import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { PostQuoteDto } from "./dto/Post-quote.dto";
import { Quote } from "./entities/quote.entity";

//Sorting by name and lastname 
//https://stackabuse.com/sort-array-of-objects-by-string-property-value/


@Injectable()
export class QuoteService {
    constructor(
        @InjectRepository(Quote) private readonly quoteRepository: Repository<Quote>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,) { }


    async findUserUpvotedQuotes(userId: number) {

        //First lets get the users upvotes !
        const foundUser = await this.userRepository.findOne(userId)
        const userUpvotes = foundUser.upvotes;

        //Secondly lets get all of the quotes
        const allQuotes = await this.quoteRepository.find({
            relations: ['userTk']
        })
        const likedQuotes = [];


        userUpvotes.forEach(elementLikedId => {
            allQuotes.forEach(elementQuote => {
                if (elementLikedId === elementQuote.quoteId) {
                    likedQuotes.push(elementQuote)
                }
            });
        });

        return likedQuotes;
    }

    async findUserQuotes(userId: number) {
        return await this.quoteRepository.find({
            where: { userTk: userId },
            relations: ['userTk']
        })
    }

    async findMostUpvotedQuotes() {
        //First we need to get all of the quotes
        const quotes = await this.quoteRepository.find({
            relations: ['userTk'],
            order: {
                votes: 'DESC'
            }
        });

        return quotes;
    }

    async fintMostRecentQuotes() {
        //First we need to get all of the quotes
        const quotes = await this.quoteRepository.find({
            relations: ['userTk'],
            order: {
                quoteId: 'DESC'
            }
        });

        return quotes;
    }

    async addQuote(postQuoteDto: PostQuoteDto, userId: number): Promise<string> {

        //Get the user that is posting the quote
        const foundUser = await this.userRepository.findOne(userId);

        const addedQuote = await this.quoteRepository.create(postQuoteDto);

        var moment = require('moment')
        var created = moment().format('YYYY-MM-DD HH:mm:ss')
        addedQuote.created = created;

        addedQuote.votes = 0;
        addedQuote.userTk = foundUser;

        await this.quoteRepository.save(addedQuote);

        //return the user and its relation
        return "The quote has been added";
    }

    async userQuoteUpVote(quoteId: number, userId: number): Promise<User> {

        //For checking if the quote has been downvoted before !
        var downvoted = false;
        var upvoted = false;

        //First we need to load the user and the quote so we can compare and store 
        //the necessary values
        const user = await this.userRepository.findOne(userId);
        const quote = await this.quoteRepository.findOne(quoteId);

        const userUpvotes = user.upvotes;
        const userDownvotes = user.downvotes

        //Then we must check if the user has already upvoted this specific quote!
        userUpvotes.forEach(element => {
            if (element === quoteId) {
                const index = userUpvotes.indexOf(element);
                userUpvotes.splice(index, 1);
                upvoted = true;
            }
        });

        //Then we must check if the user has downvoted this quote!
        userDownvotes.forEach(element => {
            if (element === quoteId) {
                const index = userDownvotes.indexOf(element);
                userDownvotes.splice(index, 1);
                downvoted = true;
            }
        });

        if (!upvoted) {
            userUpvotes.push(quoteId);
        }

        //Checks if the quote has been downvoted or not
        //if it has been downvoted we have to increment the vote by 2 
        //If it wasnt downvoted then we just have to increment by 1
        var numb;
        if (downvoted) {
            numb = 2;
        } else {
            numb = 1;
        }

        if (upvoted) {
            numb = -1
        }

        const foundQuote = await this.quoteRepository.preload({
            //Set the preload info for the quote 
            quoteId: +quoteId,
            votes: quote.votes + numb
        });

        //save the updated found quote
        await this.quoteRepository.save(foundQuote);

        //saving the upvote record !
        const foundUser = await this.userRepository.preload({
            //Set the preload info for the user 
            userId: +userId,
            upvotes: userUpvotes,
            downvotes: userDownvotes
        });

        await this.userRepository.save(foundUser);

        return foundUser;
    }

    async userQuoteDownVote(quoteId: number, userId: number): Promise<User> {
        //For checking if the quote has been upvoted before !
        var downvoted = false;
        var upvoted = false;

        //First we need to load the user and the quote so we can compare and store 
        //the necessary values
        const user = await this.userRepository.findOne(userId);
        const quote = await this.quoteRepository.findOne(quoteId);

        const userDownvotes = user.downvotes
        const userUpvotes = user.upvotes;


        //Then we must check if the user has already downvoted this specific quote!
        userDownvotes.forEach(element => {
            if (element === quoteId) {
                const index = userDownvotes.indexOf(element);
                userDownvotes.splice(index, 1);
                downvoted = true;
            }
        });

        //Then we must check if the user has upvoted this quote!
        userUpvotes.forEach(element => {
            if (element === quoteId) {
                const index = userUpvotes.indexOf(element);
                userUpvotes.splice(index, 1);
                upvoted = true;
            }
        });

        if (!downvoted) {
            userDownvotes.push(quoteId);
        }

        //Checks if the quote has been upvoted or not
        //if it has been upvoted we have to increment the vote by 2 
        //If it wasnt upvoted then we just have to increment by 1
        var numb;
        if (upvoted) {
            numb = 2;
        } else {
            numb = 1;
        }

        if (downvoted) {
            numb = -1
        }

        const foundQuote = await this.quoteRepository.preload({
            //Set the preload info for the quote 
            quoteId: +quoteId,
            votes: quote.votes - numb
        });

        //save the updated found quote
        await this.quoteRepository.save(foundQuote);

        //saving the upvote record !
        const foundUser = await this.userRepository.preload({
            //Set the preload info for the user 
            userId: +userId,
            upvotes: userUpvotes,
            downvotes: userDownvotes
        });

        await this.userRepository.save(foundUser);

        return foundUser;
    }

}