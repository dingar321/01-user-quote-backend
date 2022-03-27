import { Body, ConflictException, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetLoggedUserById } from "src/utils/get-user-by-id.decorator";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { CreateQuoteDto } from "./dto/create-quote.dto";
import { QuoteService } from "./quote.service";

@ApiTags('quotes')
@Controller()
export class QuoteController{
    constructor(private readonly quoteService: QuoteService){}

    //ENDPOINT: /myquotes (Post/update your quote)
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Post('myquotes')
    postQuote(@Body() createQuoteDto: CreateQuoteDto, @GetLoggedUserById() userId: number){
        return this.quoteService.createQuote(createQuoteDto, userId);
    }

    
}