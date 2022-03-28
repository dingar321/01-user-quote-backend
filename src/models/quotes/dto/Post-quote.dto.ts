import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PostQuoteDto {

    @ApiProperty()
    @IsString()
    readonly content: string;
}