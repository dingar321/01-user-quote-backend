import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePassUserDto } from "./dto/update-pass-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@ApiTags('users')
@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}
    
    //Returns all users from the database  
    @ApiOkResponse({description: 'All users returned OK'})
    @Get()
    getAllUsers(@Query() paginationQuery){
        const { limit, offset } = paginationQuery;
        return this.userService.findAllUsers();
    }

    //Returns a specific user from the database 
    //with a specified id 
    @ApiNotFoundResponse({description: 'The user with the specified id doesnt exists'})
    @Get(':id')
    getUser(@Param('id') id: number){
        return this.userService.findUser(id);
    }

    //Creates a user in the database
    //Users must have a unique email (Error:409 if not unique)
    @ApiCreatedResponse({description: 'The user has been created'})
    @ApiConflictResponse({description: 'The user must register with a unique email'})
    @Post()
    postUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    //Edits a specific user in the database
    //with a specified id
    @Patch(':id')
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
    @Delete(':id')
    deleteUser(@Param('id') id: string, @Body() body){
        return this.userService.removeUser(id);
    }


}