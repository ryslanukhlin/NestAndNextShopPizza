import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            clientID: "1039089113540-k5pkcpnsa4eq6446risiup8sh6cn418g.apps.googleusercontent.com",
            clientSecret: "-Bc-5tx99EkDXMA4r8u6Ifn5",
            callbackURL: 'http://localhost:8000/auth/google/redirect',
            scope: ['email', 'profile'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile

        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }

        done(null, user);
    }
}