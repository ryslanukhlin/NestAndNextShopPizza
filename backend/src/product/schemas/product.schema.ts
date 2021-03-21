import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

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
}

export const ProductSchema = SchemaFactory.createForClass(Product);