import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Comment} from "../../comments/comment.schema";


export type ProductDocument = Product & mongoose.Document;

@Schema()
export class Product {
    @Prop({ unique: true })
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop({ default: null })
    image: string | null

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: Comment.name}])
    comments: Comment[]
}

export const ProductSchema = SchemaFactory.createForClass(Product);