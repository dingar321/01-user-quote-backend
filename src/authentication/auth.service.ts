import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/users/entities/user.entity";
import { Repository } from "typeorm";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService{
    constructor(@InjectRepository(User)
    private readonly userReposatory: Repository<User>){}



    //Local login
    async signInLocal(signInDto: SignInDto){
        //Get user:
        const foundUser = await this.userReposatory.findOne({ email: signInDto.email })
        
        //Check if he exists
        if(!foundUser){
            throw new UnauthorizedException("Credentials incorrect");
        }    

        //Hash: Checking if the passowrd is the same as the one in the database
        const isMatch = await bcrypt.compare(signInDto.password, foundUser.password);

        //Compare passwords
        if(!isMatch){
            throw new UnauthorizedException("Credentials incorrect");
        }

        //Return if succes
        return foundUser;
    }

    //Local registration
    signUpLocal(signUpDto: SignUpDto){

    }

}