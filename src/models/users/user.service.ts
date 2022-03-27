import { Repository } from "typeorm";
import { UpdatePassUserDto } from "./dto/update-pass-user.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) 
    private readonly userRepository: Repository<User>){}

    //ENDPOINT: /me (Get the currently logged in user information)
    async findLoggedUser(userId: number){
        const loggedUser = await this.userRepository.findOne({
            where: { userid: userId}
        })
        if(!loggedUser){
            throw new NotFoundException('User #' + {userId} + 'not found');
        }
        return loggedUser;
    }

    //ENDPOINT: /me/update-password (Update the current users password)
    async updatePassUser(userId: number, updatePassUser: UpdatePassUserDto){
        const preloadedUser = await this.userRepository.preload({
            userid: +userId,
            password: updatePassUser.password,
        });
        if(!preloadedUser){
            throw new NotFoundException('User #' + {userId} + 'not found')
        }
        preloadedUser.password = await bcrypt.hash(updatePassUser.password, await bcrypt.genSalt());
        return this.userRepository.save(preloadedUser);
    }

    //-----------------------------------------------------------------

/*

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



    async removeUser(id: string){
        const foundUser = await this.userRepository.findOne(id)
        if(!foundUser){
            throw new NotFoundException('User #' + {id} + 'not found')
        }
        return this.userRepository.remove(foundUser);
    }
    */
}
