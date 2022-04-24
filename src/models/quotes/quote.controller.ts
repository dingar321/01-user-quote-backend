import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { GetAuthUser } from "src/utils/decorators/get-auth-user.decorator";
import { User } from "../users/entities/user.entity";
import { PostQuoteDto } from "./dto/Post-quote.dto";
import { Quote } from "./entities/quote.entity";
import { QuoteService } from "./quote.service";

@ApiTags('quotes')
@Controller()
export class QuoteController {
    constructor(private readonly quoteService: QuoteService) { }


}