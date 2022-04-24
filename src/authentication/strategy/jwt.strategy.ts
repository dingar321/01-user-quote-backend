import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtToken') {
    constructor(private configService: ConfigService) {

        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          //NOTICE: Disable in production!
          ignoreExpiration: true,
          //secretOrKey: process.env.JWT_TOKEN_SECRET,
          secretOrKey: 'D1FBED8EAEB7E37694B42C0BB7B4B93B275A44DB66436DBFEAE6D89BF80C57D5',
        });
      }
    
      async validate(payload: any) {
        return payload;
      }
}