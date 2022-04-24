import { createParamDecorator, ExecutionContext } from "@nestjs/common";

//Gets the authenticated/logged in user  

export const GetAuthUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user?.sub;
    }
)
