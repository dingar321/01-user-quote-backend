import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Quote } from "src/models/quotes/entities/quote.entity";

export class CreateUserDto{

    //IsEmail ??
    @ApiProperty()
    @IsString()
    readonly email: string;
    
    @ApiProperty()
    @IsString()
    readonly firstname: string;
    
    @ApiProperty()
    @IsString()
    readonly lastname: string;
    
    @ApiProperty()
    @IsString()
    readonly password: string;
}