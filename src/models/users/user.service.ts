import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { number } from "joi";
import { Repository } from "typeorm";
import { Quote } from "../quotes/entities/quote.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePassUserDto } from "./dto/update-pass-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";


@Injectable()
export class UserService{
    constructor(@InjectRepository(User) 
    private readonly userRepository: Repository<User>){}

    /*
    //Mockup:
    private quote: Quote = {
        quoteid: 1,
        content: 'quote1'
    }

    private users: User[] = [
        {
            userid: 1,
            email: 'dino@gmail.com',
            firstname: 'dino',
            lastname: 'garic',
            password: '123',
            quote: this.quote,
        },
    ];
    */

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

    createUser(createUserDto: CreateUserDto){
        const createdUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(createdUser);
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

    async removeUser(id: number){
        const foundUser = await this.userRepository.findOne(id)
        if(!foundUser){
            throw new NotFoundException('User #' + {id} + 'not found')
        }
        return this.userRepository.remove(foundUser);
    }
}