import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from "./dto/user-create.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { FuleTypeEnum } from 'src/file/enum/type-file.enum';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private fileService: FileService) { }

    @Post()
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Post('icon')
    @UseInterceptors(FileInterceptor('icon'))
    async downloadIcon(@UploadedFile() icon: Express.Multer.File, @Body('id') id: string) {
        const iconName = await this.fileService.createImage(icon, FuleTypeEnum.icon)
        await this.usersService.downloadIcon(id, iconName)
        return await this.usersService.findOneById(id)
    }
}
