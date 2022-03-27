import { Body, Controller, Post } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";


@ApiTags('authentication')
@Controller()
export class AuthController{
    constructor(private authService: AuthService){}

    //Local login
    @ApiOkResponse({description: 'User has successfully logged in'})
    @ApiNotFoundResponse({description: "User doesnt exists"})
    @ApiUnauthorizedResponse({description: "User is not authorized, wrong password or email"})
    @Post('login')
    signInLocal(@Body() signInDto: SignInDto){
        return this.authService.signInLocal(signInDto);
    }

    //Local registration
    @Post('signup')
    signUpLocal(@Body() signUpDto: SignUpDto){
        return this.authService.signUpLocal(signUpDto);
    }



}