import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { User } from "src/models/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    //ENDPOINT: /login (Logs in an existing user with a password)
    //Responses:
    @ApiOkResponse({ description: 'User has successfully logged in' })
    @ApiBadRequestResponse({ description: 'Values must be provided in the correct format' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Logging in an existing account (Authentication)' })
    //Method:
    @Post('auth/login')
    signInLocal(@Body() signInDto: SignInDto): Promise<string> {
        return this.authService.signInLocal(signInDto);
    }

    //ENDPOINT: /signup (Sign up to the system (username, password))
    //Responses:
    @ApiCreatedResponse({ description: 'user has successfully registered' })
    @ApiBadRequestResponse({ description: 'Values must be provided in the correct format' })
    @ApiConflictResponse({ description: 'User with that email already exists' })
    @ApiInternalServerErrorResponse({ description: 'Something unexpected went wrong' })
    //Description
    @ApiOperation({ summary: 'Creating a new account' })
    //Method:
    @Post('auth/signup')
    signUpLocal(@Body() signUpDto: SignUpDto): Promise<User> {
        return this.authService.signUpLocal(signUpDto);
    }



}