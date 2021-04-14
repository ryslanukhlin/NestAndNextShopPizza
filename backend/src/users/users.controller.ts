import { Body, Controller, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from "./dto/user-create.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post()
    async register(@Body() createUserDto: CreateUserDto){
        return this.usersService.createUser(createUserDto);
    }
}
