import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Quote } from "../quotes/entities/quote.entity";
import { User } from "./entities/user.entity";
import { getConnection, Like, Repository } from "typeorm";
import { UpdatePassUserDto } from "./dto/pass-update-user.dto";
import { PostQuoteDto } from "../quotes/dto/Post-quote.dto";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Quote) private readonly quoteRepository: Repository<Quote>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,) { }

    //ENDPOINT: /me (Get the currently logged in user information)
    async findLoggedUser(userId: number): Promise<User> {

        const loggedUser = await this.userRepository.findOne({
            where: { userId: userId }
        })
        if (!loggedUser) {
            throw new NotFoundException('User doesnt exist found')
        }

        /*
        //We need to return the user with his quote
        return this.userRepository.findOne(loggedUser.userId,{
            relations: ['quoteTk']
        });
        */

        //returning the user without the quote
        return this.userRepository.findOne(loggedUser.userId);
    }

    //ENDPOINT: /me/update-password (Update the current users password)
    async updatePassUser(userId: number, updatePassUser: UpdatePassUserDto): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where: {
                userId: userId,
            }
        });

        if (!foundUser) {
            throw new NotFoundException('User doesnt exist found')
        }


        const isMatch = await bcrypt.compare(updatePassUser.password, foundUser.password);
        //Checks if new and old password are the same
        if (isMatch) {
            throw new BadRequestException('New password cannot be the same as the old password ')
        }

        foundUser.password = await bcrypt.hash(updatePassUser.password, await bcrypt.genSalt());
        return this.userRepository.save(foundUser);
    }


    //ENDPOINT: /user/:id/ (List username & result of votes of a user quote)
    async findUserById(userId: number): Promise<User> {
        const foundUser = await this.userRepository.findOne(userId, {
            relations: ['quoteTk']
        });
        if (!foundUser) {
            throw new NotFoundException('User doesnt exist');
        }
        return foundUser;
    }

    //ENDPOINT: /myquotes (Post/update your quote)
    async createQuote(postQuoteDto: PostQuoteDto, userId: number): Promise<User> {
        //Check if quote already exists, if it does the method throws an error
        if ((await this.quoteRepository.findOne({ content: postQuoteDto.content }))) {
            throw new ConflictException('Quote with this content already exists');
        }

        //Get the user that is posting the quote
        const foundUser = await this.userRepository.findOne(userId, {
            relations: ['quoteTk']
        });

        //Check if the user even has a quote
        if (foundUser.quoteTk == null) {
            //Creates the quote object for the user
            const postedQuote = this.quoteRepository.create({
                content: postQuoteDto.content,
                upvotes: 0,
            })
            //Gives the qote objec tto the user
            const foundUserAppend = await this.userRepository.preload({
                userId: foundUser.userId,
                quoteTk: postedQuote
            });

            await this.userRepository.save(foundUserAppend);
        }
        else {
            //Preloads the already existsing quote
            const postedQuote = await this.quoteRepository.preload({
                quoteId: foundUser.quoteTk.quoteId,
                content: postQuoteDto.content,
                upvotes: foundUser.quoteTk.upvotes,
            })
            await this.quoteRepository.save(postedQuote);
        }

        //return the user and its relation
        return await this.userRepository.findOne(userId, {
            relations: ['quoteTk']
        });

    }

    //ENDPOINT: /user/:id/upvote (Upvote a user quote)
    async userQuoteUpVote(userId: number): Promise<User> {
        //Get user:
        const foundUser = await this.userRepository.findOne(userId, {
            relations: ['quoteTk']
        });

        //Check if the user even exists
        if (!foundUser) {
            throw new NotFoundException('User doesnt exist');
        }
        //Check if the user even has a quote
        if (foundUser.quoteTk == null) {
            throw new BadRequestException('User doesnt have a quote, canot upvote')
        }
        //Get the user quote
        const UsersQuote = await this.quoteRepository.preload({
            quoteId: foundUser.quoteTk.quoteId,
            content: foundUser.quoteTk.content,
            upvotes: foundUser.quoteTk.upvotes + 1,
        })
        //Save
        await this.quoteRepository.save(UsersQuote);

        //Return user
        return await this.userRepository.findOne({
            relations: ['quoteTk'],
            where: {
                userId: userId,
            }
        })
    }


    //ENDPOINT: /user/:id/downvote (Downvote user quote)
    async userQuoteDownVote(userId: number): Promise<User> {
        //Get user:
        const foundUser = await this.userRepository.findOne(userId, {
            relations: ['quoteTk']
        });

        //Check if the user even exists
        if (!foundUser) {
            throw new NotFoundException('User doesnt exist');
        }
        //Check if the user even has a quote
        if (foundUser.quoteTk == null) {
            throw new BadRequestException('User doesnt have a quote, canot downvote')
        }
        //Get the user quote
        const UsersQuote = await this.quoteRepository.preload({
            quoteId: foundUser.quoteTk.quoteId,
            content: foundUser.quoteTk.content,
            upvotes: foundUser.quoteTk.upvotes - 1,
        })
        //save both changes
        await this.quoteRepository.save(UsersQuote);

        //Return user
        return await this.userRepository.findOne({
            relations: ['quoteTk'],
            where: {
                userId: userId,
            }
        })
    }

    //ENDPOINT: /list (List users and quotes in a most upvoted to least liked quotes)
    async findUsersWithQuote() {
        return await getConnection()
            .getRepository(User)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.quoteTk', 'quotesId')
            .orderBy('upvotes', 'DESC') //Sorts it descending
            //ToDo: Fix where clause
            //.where("users.quote.quote_id = :any", { any: 16 })
            .getMany()
    }
}
