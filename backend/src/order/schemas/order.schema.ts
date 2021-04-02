import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { TOrder } from "../types/Order.types";

export type OrderDocument = Order & mongoose.Document;

@Schema()
export class Order {
    @Prop()
    name: string;

    @Prop()
    adress: string;

    @Prop()
    tell: string;

    @Prop()
    price: number;

    @Prop({default: null})
    optionst: string | null;

    @Prop([{type: { type: mongoose.Types.ObjectId, ref: Order.name }, count: Number}])
    product: TOrder[]
}

export const OrderSchema = SchemaFactory.createForClass(Order);