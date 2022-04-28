import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Quote } from "../quotes/entities/quote.entity";
import { User } from "./entities/user.entity";
import { getConnection, Like, Repository } from "typeorm";
import { UpdatePassUserDto } from "./dto/pass-update-user.dto";
import { PostQuoteDto } from "../quotes/dto/Post-quote.dto";
import console, { timeStamp } from "console";
import { timestamp } from "rxjs";
import { number } from "joi";


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

        //returning the user
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

    //ENDPOINT: /me (Get the currently logged in user information)
    async findLoggedUserkarma(userId: number): Promise<number> {

        var karma = 0;

        const usersQuotes = await this.quoteRepository.find({
            where: { userTk: userId },
            relations: ['userTk']
        })

        usersQuotes.forEach(element => {
            karma = karma + element.votes;
        });

        //returning the user
        return karma;
    }

    /*
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
    */





}
