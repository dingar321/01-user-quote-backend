import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class UpvoteQuote {


    @ApiProperty()

    readonly quoteId: number;

    @ApiProperty()

    readonly userId: number;
}
