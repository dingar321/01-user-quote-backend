import { IsString } from "class-validator";
import { Quote } from "src/models/quotes/entities/quote.entity";

export class CreateUserDto{

    //IsEmail ??
    @IsString()
    readonly email: string;
    
    @IsString()
    readonly firstname: string;
    
    @IsString()
    readonly lastname: string;
    
    @IsString()
    readonly password: string;
}