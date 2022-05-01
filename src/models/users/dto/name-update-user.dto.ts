import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateNameUserDto {

    @ApiProperty()
    @IsString()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    readonly lastName: string;

}