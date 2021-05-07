import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { CommentDocument } from 'src/comments/comment.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>){}

    async getPizza(): Promise<Product[]> {
        return this.productModel.find()
    }

    async getPizzaById(id: ProductDocument): Promise<Product> {
        return this.productModel.findById(id).populate('comments')
    }

    async createProduct(createProductDto: CreateProductDto, image: string): Promise<Product> {
        return this.productModel.create({...createProductDto, image})
    }

    async pushComment(productId: ProductDocument, commentId: CommentDocument): Promise<void> {
        await this.productModel.findOneAndUpdate({ _id: productId }, { $push: { comments: commentId } })
    }
}
