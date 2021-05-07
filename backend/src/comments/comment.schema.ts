import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import {User} from "../users/schema/user.schema";

export type CommentDocument = Comment & mongoose.Document

@Schema()
export class Comment{
    @Prop({type: String, required: true })
    text: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    userId: User
}

export const CommentSchema = SchemaFactory.createForClass(Comment)