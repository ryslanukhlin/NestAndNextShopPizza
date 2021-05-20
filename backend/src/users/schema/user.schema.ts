import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    nicname: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: null })
    icon: string | null
}

export const UserSchema = SchemaFactory.createForClass(User)