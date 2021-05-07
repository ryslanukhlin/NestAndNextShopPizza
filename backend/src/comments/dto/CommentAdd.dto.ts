import {IsMongoId, IsNotEmpty, IsString} from "class-validator";
import * as mongoose from "mongoose";
import {ProductDocument} from "../../product/schemas/product.schema";

export class CommentAddDto {
    @IsNotEmpty()
    @IsString()
    text: string

    @IsNotEmpty()
    @IsMongoId()
    userId: mongoose.Schema.Types.ObjectId

    @IsNotEmpty()
    @IsMongoId()
    productId: ProductDocument & string
}