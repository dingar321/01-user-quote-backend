import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto{
    //IsEmail ??
    //@IsEmail()
    @ApiProperty()
    @IsString()
    email?: string;
    
    @ApiProperty()
    @IsString()
    firstname?: string;
    
    @ApiProperty()
    @IsString()
    lastname?: string;
    
    @ApiProperty()
    @IsString()
    password?: string;
}