import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import * as mongoose from "mongoose";


class productParams {
    @IsNotEmpty()
    @IsMongoId()
    readonly productId: mongoose.Types.ObjectId

    @IsNumber()
    @IsNotEmpty()
    readonly count: number
}

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly adress: string;

    @IsNotEmpty()
    @IsString()
    readonly tell: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
    readonly optionst?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => productParams)
    readonly product: productParams[];
}