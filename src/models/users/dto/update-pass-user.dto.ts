import { IsString } from "class-validator";

export class UpdatePassUserDto {

    @IsString()
    password: string;
}