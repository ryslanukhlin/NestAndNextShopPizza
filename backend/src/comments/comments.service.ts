import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Comment, CommentDocument} from "./comment.schema";
import {Model} from "mongoose";
import {CommentAddDto} from "./dto/CommentAdd.dto";
import {ProductService} from "../product/product.service";
import {ProductDocument} from "../product/schemas/product.schema";

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                private productService: ProductService) {}

    async createComment(commentAddDto: CommentAddDto): Promise<{comment: Comment, productId: ProductDocument & string}>{
        const productId = commentAddDto.productId
        delete commentAddDto.productId
        const comment = await this.commentModel.create(commentAddDto);
        await this.productService.pushComment(productId, comment._id);
        return { comment, productId }
    }
}
