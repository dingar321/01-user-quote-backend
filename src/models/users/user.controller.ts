import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GetLoggedUserById } from "src/utils/get-user-by-id.decorator";
import { UpdatePassUserDto } from "./dto/update-pass-user.dto";
import { UserService } from "./user.service";

@ApiTags('users')
@Controller()
export class UserController{
    constructor(private readonly userService: UserService){}

    //ENDPOINT: /me (Get the currently logged in user information)
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Get('/me')
    getLoggedUser(@GetLoggedUserById() userId: number){
        return this.userService.findLoggedUser(userId);
    }

    //ENDPOINT: /me/update-password (Update the current users password)
    //Edits the password of a specific user in the database with a specified id
    @ApiNotFoundResponse({description: 'The user with the specified id doesnt exists'})
    @ApiOkResponse({description: 'The user with the specified id has been found and the password has been updated'})
    @ApiBearerAuth('jwtToken')
    @UseGuards(AuthGuard('jwtToken'))
    @Patch('/me/password-change:id')
    patchPassUser(@GetLoggedUserById() userId: number, @Body() UpdatePassUserDto: UpdatePassUserDto)
    {
        return this.userService.updatePassUser(userId, UpdatePassUserDto);
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