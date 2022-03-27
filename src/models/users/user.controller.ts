
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetLoggedUserById } from "src/utils/get-user-by-id.decorator";
import { UpdatePassUserDto } from "./dto/update-pass-user.dto";
import { UserService } from "./user.service";

@ApiTags('users')
@Controller('')
export class UserController{
    constructor(private readonly userService: UserService){}

    //ENDPOINT: /me (Get the currently logged in user information)
    @ApiOperation({ summary: 'Getting the logged in users information and quote(if they posted a quote)' })
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Get('/me')
    getLoggedUser(@GetLoggedUserById() userId: number){
        return this.userService.findLoggedUser(userId);
    }

    //ENDPOINT: /me/update-password (Update the current users password)
    //Edits the password of a specific user in the database with a specified id
    @ApiOperation({ summary: 'Changing the password for the logged in user' })
    @ApiNotFoundResponse({description: 'The user with the specified id doesnt exists'})
    @ApiOkResponse({description: 'The user with the specified id has been found and the password has been updated'})
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Patch('/me/password-change:id')
    patchPassUser(@GetLoggedUserById() userId: number, @Body() updatePassUserDto: UpdatePassUserDto): Promise<import("c:/Users/Dino/Documents/GitHub/01-user-quote-backend/src/models/users/entities/user.entity").User>
    {
        return this.userService.updatePassUser(userId, updatePassUserDto);
    }

    //ENDPOINT: /user/:id/upvote (Upvote a user quote)
    //Upvotes selected  the users quote
    //Can only apply to users that have a quote
    @ApiOperation({ summary: 'Upvotes a selected users quote' })
    @ApiNotFoundResponse({description: 'The user with the specified id doesnt exists'})
    @ApiUnauthorizedResponse({description: "user doesnt have a quote, cannot upvote"})
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Get('users/:id/upvote')
    userQuoteUpVote(@Param('id') userId: number){
        return this.userService.userQuoteUpVote(userId);
    }

    //ENDPOINT: /user/:id/downvote (Downvote user quote)
    //Downvotes selected the users quote
    //Can only apply to users that have a quote
    @ApiOperation({ summary: 'Downvotes a selected users quote' })
    @ApiNotFoundResponse({description: 'The user with the specified id doesnt exists'})
    @ApiUnauthorizedResponse({description: "user doesnt have a quote, cannot downvote"})
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Get('users/:id/downvote')
    userQuoteDownVote(@Param('id') userId: number){
        return this.userService.userQuoteDownVote(userId);
    }

    //-----------------------------------------------------------------

    /*

    //Returns all users from the database  
    @ApiOkResponse({description: 'All users returned OK'})
    @Get('users')
    getAllUsers(@Query() paginationQuery){
        const { limit, offset } = paginationQuery;
        return this.userService.findAllUsers();
    }

    //Returns a specific user from the database 
    //with a specified id 
    @ApiNotFoundResponse({description: 'The user with the specified id doesnt exists'})
    @ApiOkResponse({description: 'The user with the specified id has been found'})
    @Get('users/:id')
    getUser(@Param('id') id: number){
        return this.userService.findUser(id);
    }

    //Edits a specific user in the database
    //with a specified id
    @Patch('users/:id')
    patchUser(@Param('id') id: number, @Body() updateUserdto: UpdateUserDto){
        return this.userService.updateUser(id, updateUserdto);
    }

    //Edits the password of a specific user in the database
    //with a specified id
    @ApiNotFoundResponse({description: 'The user with the specified id doesnt exists'})
    @ApiOkResponse({description: 'The user with the specified id has been found and the password has been updated'})
    @Patch('/me/password-change:id')
    patchPassUser(@Param('id') id: number, @Body() UpdatePassUserDto: UpdatePassUserDto)
    {
        return this.userService.updateUser(id, UpdatePassUserDto);
    }

    //Deletes a specific user in the database
    //with a specified id
    @ApiNotFoundResponse({description: 'The user with the specified id doesnt exists'})
    @ApiOkResponse({description: 'The user with the specified id has been found and deleted'})
    @Delete('users/:id')
    deleteUser(@Param('id') id: string, @Body() body){
        return this.userService.removeUser(id);
    }

*/
}