import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetAuthUser } from "src/utils/decorators/get-auth-user.decorator";
import { User } from "../users/entities/user.entity";
import { PostQuoteDto } from "./dto/Post-quote.dto";
import { Quote } from "./entities/quote.entity";
import { QuoteService } from "./quote.service";

@ApiTags('quotes')
@Controller()
export class QuoteController {
    constructor(private readonly quoteService: QuoteService) { }


    @ApiOkResponse({ description: 'Quote has been returned' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Returns the specified quote by id' })
    //Method:
    @Get('/:id/quote')
    getQuoteById(@Param('id') quoteId: number) {
        return this.quoteService.finQuoteById(quoteId);
    }


    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @ApiOkResponse({ description: 'All users upvoted quotes have been returned' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Get the logged users upvoted quotes' })
    //Method:
    @Get('/user-upvoted-quotes')
    getUserUpvotedQuotes(@GetAuthUser() userId: number) {
        return this.quoteService.findUserUpvotedQuotes(userId);
    }


    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @ApiOkResponse({ description: 'All user quotes have been returned' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Get the logged users quotes' })
    //Method:
    @Get('/user-quotes')
    getUserQuotes(@GetAuthUser() userId: number) {
        return this.quoteService.findUserQuotes(userId);
    }

    @ApiOkResponse({ description: 'Most voted quotes have been returned' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Get the most voted quotes' })
    //Method:
    @Get('/most-upvoted')
    getMostUpvotedQuotes() {
        return this.quoteService.findMostUpvotedQuotes();
    }


    @ApiOkResponse({ description: 'Recently added quotes have been returned' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Get the recently added quotes' })
    //Method:
    @Get('/most-recent')
    getMostRecentQuotes() {
        return this.quoteService.fintMostRecentQuotes();
    }

    //ENDPOINT: /addquote (Post a quote)
    //Responses:
    @ApiOkResponse({ description: 'Quote was successfully added' })
    @ApiUnauthorizedResponse({ description: 'User must be authenticated/logged in to acces the endpoint' })
    @ApiBadRequestResponse({ description: 'Values must be provided in the correct format' })
    //Description
    @ApiOperation({ summary: 'Creating or updating the quote' })
    //Method:
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Post('/addquote')
    postQuote(@Body() postQuoteDto: PostQuoteDto, @GetAuthUser() userId: number): Promise<string> {
        return this.quoteService.addQuote(postQuoteDto, userId);
    }


    //ENDPOINT: /user/:id/upvote (Upvote a user quote)
    //Responses:
    @ApiOkResponse({ description: 'Quote has been upvoted' })
    @ApiUnauthorizedResponse({ description: 'User must be authenticated/logged in to acces the endpoint' })
    @ApiNotFoundResponse({ description: 'The user with the specified id doesnt exists' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Upvotes a selected users quote' })
    //Method:
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Get('/:id/upvote')
    userQuoteUpVote(@Param('id') quoteId: number, @GetAuthUser() userId: number): Promise<User> {
        return this.quoteService.userQuoteUpVote(quoteId, userId);
    }

    //ENDPOINT: /user/:id/downvote (Downvote user quote)
    //Responses:
    @ApiOkResponse({ description: 'Quote has been downvoted' })
    @ApiUnauthorizedResponse({ description: 'User must be authenticated/logged in to acces the endpoint' })
    @ApiNotFoundResponse({ description: 'The user with the specified id doesnt exists' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Downvotes a selected users quote' })
    //Method:
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Get('/:id/downvote')
    userQuoteDownVote(@Param('id') quoteId: number, @GetAuthUser() userId: number): Promise<User> {
        return this.quoteService.userQuoteDownVote(quoteId, userId);
    }






}