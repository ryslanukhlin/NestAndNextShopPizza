import { Module } from '@nestjs/common';
import {EventsGateway} from "./events.gateway";
import {MongooseModule} from "@nestjs/mongoose";
import { CommentsService } from './comments.service';
import {CommentSchema, Comment} from "./comment.schema";
import {ProductModule} from "../product/product.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {schema: CommentSchema, name: Comment.name}
        ]),
        ProductModule
    ],
    providers: [EventsGateway, CommentsService]
})
export class CommentsModule {}
