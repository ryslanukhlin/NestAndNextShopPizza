import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user-create.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async createUser(userCreateDto: CreateUserDto): Promise<User> {
        return this.userModel.create(userCreateDto)
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email })
    }

    async findOneById(id: string): Promise<User | undefined> {
        return this.userModel.findById(id)
    }

    async downloadIcon(id: string, icon: string): Promise<User> {
        return this.userModel.findById(id).updateOne({ icon })
    }
}
