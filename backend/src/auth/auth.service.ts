import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){}

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findOne(email)
        if(user && password === user.password) {
            return user
        }
        return null
    }

    async login(user: UserDocument): Promise<{ access_token: string }>{
        const payload = { id: user._id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
