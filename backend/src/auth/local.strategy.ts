import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/users/schema/user.schema";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategry extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<User | UnauthorizedException>{
        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}