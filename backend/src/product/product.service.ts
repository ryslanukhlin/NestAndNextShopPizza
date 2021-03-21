import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import * as Mongoose from 'mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>){}

    async getPizza(): Promise<Product[]> {
        return this.productModel.find()
    }

    async getPizzaById(id: Mongoose.Types.ObjectId): Promise<Product> {
        return this.productModel.findById(id)
    }

    async createProduct(createProductDto: CreateProductDto, image: string): Promise<Product> {
        return this.productModel.create({...createProductDto, image})
    }
}
