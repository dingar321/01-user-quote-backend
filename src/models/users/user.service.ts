import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePassUserDto } from "./dto/update-pass-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UserService{
    constructor(@InjectRepository(User) 
    private readonly userRepository: Repository<User>){}

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
}