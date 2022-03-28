import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable, NotFoundException, Sse, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Quote } from "../quotes/entities/quote.entity";
import { EMPTY, find } from "rxjs";
import { User } from "./entities/user.entity";
import { getConnection, Like, Repository } from "typeorm";
import { UpdatePassUserDto } from "./dto/update-pass-user.dto";
import { IsJSON, IsNotEmpty } from "class-validator";
import { string } from "joi";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(Quote) private readonly quoteRepository: Repository<Quote>, 
        @InjectRepository(User) private readonly userRepository: Repository<User>,){}

        //ENDPOINT: /me (Get the currently logged in user information)
        async findLoggedUser(userId: number): Promise<User>{
            const loggedUser = await this.userRepository.findOne({
                where: { userid: userId}
            })
            if(!loggedUser){
                throw new NotFoundException('User doesnt exist found')
            }
    
            return this.userRepository.findOne(loggedUser.userid,{
                relations: ['quote']
            });
        }
    
        //ENDPOINT: /me/update-password (Update the current users password)
        async updatePassUser(userId: number, updatePassUser: UpdatePassUserDto): Promise<User>{
            const preloadedUser = await this.userRepository.preload({
                userid: +userId,
                password: updatePassUser.password,
            });
            if(!preloadedUser){
                throw new NotFoundException('User doesnt exist found')
            }
            preloadedUser.password = await bcrypt.hash(updatePassUser.password, await bcrypt.genSalt());
            return this.userRepository.save(preloadedUser);
        }
    
        //ENDPOINT: /user/:id/upvote (Upvote a user quote)
        async userQuoteUpVote(userId: number): Promise<User>{
            //Get user:
            const foundUser =  await this.userRepository.findOne(userId,{
                relations: ['quote']
            });
            //Check if the user even exists
            if(!foundUser){
                throw new NotFoundException('User doesnt exist found');
            }    
            //Check if the user even has a quote
            if(foundUser.quote == null){
                throw new BadRequestException('User doesnt have a quote, canot upvote')
            }
            //Get the user quote
            const UsersQuote = await this.quoteRepository.preload({
                quoteid: foundUser.quote.quoteid,
                content: foundUser.quote.content,
                upvotes: foundUser.quote.upvotes + 1,
            })
            return await this.userRepository.save(foundUser);
        }
    
        //ENDPOINT: /user/:id/downvote (Downvote user quote)
        async userQuoteDownVote(userId: number) : Promise<User>{
            //Get user:
            const foundUser =  await this.userRepository.findOne(userId,{
                relations: ['quote']
            });
            //Check if the user even exists
            if(!foundUser){
                throw new NotFoundException('User doesnt exist found');
            }    
            //Check if the user even has a quote
            if(foundUser.quote == null){
                throw new BadRequestException('User doesnt have a quote, canot downvote')
            }
            //Get the user quote
            const UsersQuote = await this.quoteRepository.preload({
                quoteid: foundUser.quote.quoteid,
                content: foundUser.quote.content,
                upvotes: foundUser.quote.upvotes - 1,
            })
            return await this.userRepository.save(foundUser);
        }

        //ENDPOINT: /user/:id/ (List username & result of votes of a user quote)
        async findUserById(userId: number): Promise<User>{
            const foundUser =  await this.userRepository.findOne(userId,{
                relations: ['quote']
            });
            if(!foundUser){
                throw new NotFoundException('User doesnt exist found');
            }
            return foundUser;
        }

        //ENDPOINT: /list (List users and quotes in a most upvoted to least liked quotes)
        async findUsersWithQuote(){
            return await getConnection()
            .getRepository(User)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.quote', 'quotes')
            .orderBy('upvotes', 'DESC') //Sorts it descending
            //ToDo: Fix where clause
            //.where("users.quote.quote_id = :any", { any: 16 })
            .getMany()
        }

    }
