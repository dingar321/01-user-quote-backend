import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetAuthUser } from "src/utils/decorators/get-auth-user.decorator";
import { PostQuoteDto } from "../quotes/dto/Post-quote.dto";
import { UpdatePassUserDto } from "./dto/pass-update-user.dto";
import { UserService } from "./user.service";
import { User } from "c:/Users/Dino/Documents/GitHub/01-user-quote-backend/src/models/users/entities/user.entity";

@ApiTags('users')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    //ENDPOINT: /me (Get the currently logged in user information)
    //Responses:
    @ApiOkResponse({ description: 'Users information was returned successfully' })
    @ApiUnauthorizedResponse({ description: 'User must be authenticated/logged in to acces the endpoint' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description:
    @ApiOperation({ summary: 'Getting the logged in users information and quote(if they posted a quote)' })
    //Method:
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Get('/me')
    getLoggedUser(@GetAuthUser() userId: number): Promise<User> {
        return this.userService.findLoggedUser(userId);
    }

    //ENDPOINT: /me/update-password (Update the current users password)
    //Edits the password of a specific user in the database with a specified id
    //Responses:
    @ApiOkResponse({ description: 'The user with the specified id has been found and the password has been updated' })
    @ApiUnauthorizedResponse({ description: 'User must be authenticated/logged in to acces the endpoint' })
    @ApiBadRequestResponse({ description: 'Values must be provided in the correct format' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description:
    @ApiOperation({ summary: 'Password has been sucessfully changed' })
    //Method:
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Patch('me/password-change/:id')
    patchPassUser(@GetAuthUser() userId: number, @Body() updatePassUserDto: UpdatePassUserDto): Promise<User> {
        return this.userService.updatePassUser(userId, updatePassUserDto);
    }

    //ENDPOINT: /user/:id (List username & result of votes of a user quote)
    //Gets a specific user with a specified id and 
    //Gets his information, quote and number of votes 
    //Responses:
    @ApiOkResponse({ description: 'User found and his information has been displayed' })
    @ApiNotFoundResponse({ description: 'The user with the specified id doesnt exists' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Gets users information, quote and number of votes' })
    //Method:
    @Get('/user/:id')
    getUserById(@Param('id') userId: number): Promise<User> {
        return this.userService.findUserById(userId);
    }

    //ENDPOINT: /myquotes (Post/update your quote)
    //We can use this endpoint to post(create) or put(update) the user's quote
    //Responses:
    @ApiOkResponse({ description: 'Quote was successfully added or updated' })
    @ApiUnauthorizedResponse({ description: 'User must be authenticated/logged in to acces the endpoint' })
    @ApiBadRequestResponse({ description: 'Values must be provided in the correct format' })
    @ApiConflictResponse({ description: 'A user has already posted that same quote' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Creating or updating the quote' })
    //Method:
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Post('/myquotes')
    postQuote(@Body() postQuoteDto: PostQuoteDto, @GetAuthUser() userId: number): Promise<User> {
        return this.userService.createQuote(postQuoteDto, userId);
    }

    //ENDPOINT: /user/:id/upvote (Upvote a user quote)
    //Upvotes the selected users quote
    //Can only apply to users that have a quote
    //Responses:
    @ApiOkResponse({ description: 'Quote has been upvoted' })
    @ApiBadRequestResponse({ description: "user doesnt have a quote, cannot upvote" })
    @ApiUnauthorizedResponse({ description: 'User must be authenticated/logged in to acces the endpoint' })
    @ApiNotFoundResponse({ description: 'The user with the specified id doesnt exists' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Upvotes a selected users quote' })
    //Method:
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Get('/users/:id/upvote')
    userQuoteUpVote(@Param('id') userId: number): Promise<User> {
        return this.userService.userQuoteUpVote(userId);
    }

    //ENDPOINT: /user/:id/downvote (Downvote user quote)
    //Downvotes the selected users quote
    //Can only apply to users that have a quote
    //Responses:
    @ApiOkResponse({ description: 'Quote has been downvoted' })
    @ApiBadRequestResponse({ description: "user doesnt have a quote, cannot downvote" })
    @ApiUnauthorizedResponse({ description: 'User must be authenticated/logged in to acces the endpoint' })
    @ApiNotFoundResponse({ description: 'The user with the specified id doesnt exists' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Downvotes a selected users quote' })
    //Method:
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Get('/users/:id/downvote')
    userQuoteDownVote(@Param('id') userId: number): Promise<User> {
        return this.userService.userQuoteDownVote(userId);
    }

    //ENDPOINT: /list (List users and quotes in a most upvoted to least liked quotes)
    //Gets all the users that have a posted quote
    //The method sorts the data by upvots "Desc"
    //Responses:
    @ApiOkResponse({ description: 'All users with a quote have been returned' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    //Method:
    @Get('/list')
    getUsersWithQuote() {
        return this.userService.findUsersWithQuote();
    }

}