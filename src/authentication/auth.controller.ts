import { Body, Controller, Post } from "@nestjs/common";
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";


@ApiTags('authentication')
@Controller()
export class AuthController{
    constructor(private authService: AuthService){}

    //ENDPOINT: /login (Logs in an existing user with a password)
    @ApiOperation({ summary: 'Logging in an existing account (Authentication)' })
    @ApiOkResponse({description: 'User has successfully logged in'})
    @ApiNotFoundResponse({description: "User doesnt exists"})
    @ApiUnauthorizedResponse({description: "User is not authorized, wrong password or email"})
    @Post('login')
    signInLocal(@Body() signInDto: SignInDto){
        return this.authService.signInLocal(signInDto);
    }

    //ENDPOINT: /signup (Sign up to the system (username, password))
    @ApiOperation({ summary: 'Creating a new account' })
    @ApiCreatedResponse({description: 'user has successfully registered'})
    @ApiConflictResponse({description: 'User with that email already exists'})
    @Post('signup')
    signUpLocal(@Body() signUpDto: SignUpDto){
        return this.authService.signUpLocal(signUpDto);
    }



}