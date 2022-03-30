import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PostQuoteDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly content: string;
}