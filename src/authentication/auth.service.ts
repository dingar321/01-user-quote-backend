import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/users/entities/user.entity";
import { Repository } from "typeorm";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthService{
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>, private jwtService: JwtService){}

    //ENDPOINT: /login (Logs in an existing user with a password)
    async signInLocal(signInDto: SignInDto): Promise<string> {
        //Get user:
        const foundUser = await this.userRepository.findOne({ email: signInDto.email })
        
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

        //Return JSON Web Token 
        //if user was authenticated and found 
        return this.jwtService.sign({ sub: foundUser.userid, email: foundUser.email , type: 'user'}); 
    }

    //ENDPOINT: /signup (Sign up to the system (username, password))
    //Info: When the user registers he has to login
    async signUpLocal(signUpDto: SignUpDto): Promise<User> {
        //Check if user with that email already exists
        //If he does send error
        if ((await this.userRepository.findOne({ email: signUpDto.email }))){
            throw new ConflictException('User already exist');
        }

        //Create object and hash the password
        const registeredUser = this.userRepository.create(signUpDto);
        registeredUser.password = await bcrypt.hash(registeredUser.password, await bcrypt.genSalt());
        
        //Return and save the user
        return this.userRepository.save(registeredUser);
    }

}