import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetAuthUser } from "src/utils/decorators/get-auth-user.decorator";
import { PostQuoteDto } from "../quotes/dto/Post-quote.dto";
import { UpdateNameUserDto } from "./dto/name-update-user.dto";
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
    @ApiOperation({ summary: 'Updates the logged users password' })
    //Method:
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Patch('me/password-change')
    patchPassUser(@GetAuthUser() userId: number, @Body() updatePassUserDto: UpdatePassUserDto): Promise<User> {
        return this.userService.updatePasswordUser(userId, updatePassUserDto);
    }

    //ENDPOINT: /me/update-change (Update the current users full name)
    @ApiOkResponse({ description: 'The user with the specified id has been found and the full name has been updated' })
    @ApiUnauthorizedResponse({ description: 'User must be authenticated/logged in to acces the endpoint' })
    @ApiBadRequestResponse({ description: 'Values must be provided in the correct format' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description:
    @ApiOperation({ summary: 'Updates the logged users full name' })
    //Method:
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Patch('me/name-change')
    patchEmailUser(@GetAuthUser() userId: number, @Body() updateNameUser: UpdateNameUserDto): Promise<User> {
        return this.userService.updateUserName(userId, updateNameUser);
    }



    //Responses:
    @ApiOkResponse({ description: 'Users information was returned successfully' })
    @ApiUnauthorizedResponse({ description: 'User must be authenticated/logged in to acces the endpoint' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description:
    @ApiOperation({ summary: 'Getting the logged in users karma' })
    //Method:
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Get('/me/karma')
    getLoggedUserKarma(@GetAuthUser() userId: number): Promise<number> {
        return this.userService.findLoggedUserkarma(userId);
    }


    /*
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
*/






}