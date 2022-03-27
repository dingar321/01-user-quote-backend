import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignUpDto{
    
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