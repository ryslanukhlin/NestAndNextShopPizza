import * as mongoose from "mongoose";

export type TOrder = {
    product: mongoose.Types.ObjectId,
    count: number
}