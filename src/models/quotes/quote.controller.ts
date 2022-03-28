import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetLoggedUserById } from "src/utils/get-user-by-id.decorator";
import { User } from "../users/entities/user.entity";
import { PostQuoteDto } from "./dto/Post-quote.dto";
import { QuoteService } from "./quote.service";

@ApiTags('quotes')
@Controller()
export class QuoteController{
    constructor(private readonly quoteService: QuoteService){}

    //ENDPOINT: /myquotes (Post/update your quote)
    //We can use this endpoint to post(create) or put(update) the user's quote
    @ApiOperation({ summary: 'Creating or updating the quote' })
    @ApiBadRequestResponse({description: 'Content in quote too long must not exceed 300 characters'})
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Post('myquotes')
    postQuote(@Body() postQuoteDto: PostQuoteDto, @GetLoggedUserById() userId: number): Promise<User> {
        return this.quoteService.createQuote(postQuoteDto, userId);
    }
}