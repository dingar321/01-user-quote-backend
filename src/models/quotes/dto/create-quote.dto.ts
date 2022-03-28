import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateQuoteDto {

   
    @ApiProperty()
    @IsString()
    readonly content: string;
    
}