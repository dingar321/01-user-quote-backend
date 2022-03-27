import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Quote } from "../quotes/entities/quote.entity";
import { find } from "rxjs";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UpdatePassUserDto } from "./dto/update-pass-user.dto";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(Quote) private readonly quoteRepository: Repository<Quote>, 
        @InjectRepository(User) private readonly userRepository: Repository<User>,){}

        //ENDPOINT: /me (Get the currently logged in user information)
        async findLoggedUser(userId: number){
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
        async updatePassUser(userId: number, updatePassUser: UpdatePassUserDto){
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
        async userQuoteUpVote(userId: number){
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
                throw new UnauthorizedException('User doesnt have a quote, canot upvote')
            }
            //Get the user quote
            const UsersQuote = await this.quoteRepository.preload({
                quoteid: foundUser.quote.quoteid,
                content: foundUser.quote.content,
                upvotes: foundUser.quote.upvotes + 1,
            })
            return await this.quoteRepository.save(UsersQuote);
        }
    
        //ENDPOINT: /user/:id/downvote (Downvote user quote)
        async userQuoteDownVote(userId: number){
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
                throw new UnauthorizedException('User doesnt have a quote, canot downvote')
            }
            //Get the user quote
            const UsersQuote = await this.quoteRepository.preload({
                quoteid: foundUser.quote.quoteid,
                content: foundUser.quote.content,
                upvotes: foundUser.quote.upvotes - 1,
            })
            return await this.quoteRepository.save(UsersQuote);
        }
    
    
        //-----------------------------------------------------------------
    
    /*
    
    >>>>>>> Stashed changes

    findAllUsers(){
        return this.userRepository.find();
    }

    async findUser(id: number){
        const foundUser = await this.userRepository.findOne(id);
        if(!foundUser){
            throw new NotFoundException('User #' + {id} + 'not found');
        }
        return foundUser;
    }

    async updateUser(id: number, UpdateUserDto: any){
        const preloadedUser = await this.userRepository.preload({
            userid: +id,
            email: UpdateUserDto.email,
            firstname: UpdateUserDto.firstname,
            lastname: UpdateUserDto.lastname,
            password: UpdateUserDto.password,
        });
        if(!preloadedUser){
            throw new NotFoundException('User #' + {id} + 'not found')
        }
        return this.userRepository.save(preloadedUser);
    }

    async updatePassUser(id: number, updatePassUser: UpdatePassUserDto){
        const preloadedUser = await this.userRepository.preload({
            userid: +id,
            password: updatePassUser.password,
        });
        if(!preloadedUser){
            throw new NotFoundException('User #' + {id} + 'not found')
        }
        return this.userRepository.save(preloadedUser);
    }

    async removeUser(id: string){
        const foundUser = await this.userRepository.findOne(id)
        if(!foundUser){
            throw new NotFoundException('User #' + {id} + 'not found')
        }
        return this.userRepository.remove(foundUser);
    }
    */
}
