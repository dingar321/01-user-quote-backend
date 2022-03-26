import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePassUserDto } from "./dto/update-pass-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}
    
    //Returns all users from the database  
    @Get()
    getAllUsers(@Query() paginationQuery){
        const { limit, offset } = paginationQuery;
        return this.userService.findAllUsers();
    }

    //Returns a specific user from the database 
    //with a specified id 
    @Get(':id')
    getUser(@Param('id') id: number){
        return this.userService.findUser(id);
    }

    //Creates a user in the database
    //Users must have a unique password (Error:500 if not unique)
    @Post()
    postUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    /*
    //Edits a specific user in the database
    //with a specified id
    @Patch(':id')
    patchUser(@Param('id') id: number, @Body() updateUserdto: UpdateUserDto){
        return this.userService.updateUser(id, updateUserdto);
    }
    */

    @Patch(':id')
    patchPassUser(@Param('id') id: number, @Body() UpdatePassUserDto: UpdatePassUserDto)
    {
        return this.userService.updateUser(id, UpdatePassUserDto);
    }

    //Deletes a specific user in the database
    //with a specified id
    @Delete(':id')
    deleteUser(@Param('id') id: string, @Body() body){
        return this.userService.removeUser(id);
    }


}