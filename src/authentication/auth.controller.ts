import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('authentication')
@Controller()
export class AuthController{
    constructor() {}

    signUp(){

    }

    signIn(){
        
    }
}