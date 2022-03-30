import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateUserDto{

    //IsEmail ??
    @ApiProperty()
    @IsString()
    readonly email: string;
    
    @ApiProperty()
    @IsString()
    readonly firstName: string;
    
    @ApiProperty()
    @IsString()
    readonly lastName: string;
    
    @ApiProperty()
    @IsString()
    readonly password: string;
}