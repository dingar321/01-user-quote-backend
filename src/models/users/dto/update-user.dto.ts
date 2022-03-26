import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto){
    //Takes "CreateUserDto" as a type and returns all the properties
    //and setts them as optional
}