import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection, OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentsService } from "./comments.service";
import { CommentAddDto } from "./dto/CommentAdd.dto";
import { ProductService } from "../product/product.service";

@WebSocketGateway()
export class EventsGateway{
    constructor(private commentService: CommentsService,
        private productService: ProductService) { }

    @WebSocketServer() wss: Server

    @SubscribeMessage('COMMENT:ROOM')
    async createRoom(@ConnectedSocket() socket: Socket, @MessageBody() productId: string) {
        socket.join(productId)
    }

    @SubscribeMessage('COMMENT:ADD')
    async commentAdd(@MessageBody() commentAddDto: CommentAddDto): Promise<any> {
        const { comment, productId } = await this.commentService.createComment(commentAddDto)
        const Product = await this.productService.getPizzaById(productId)
        this.wss.to(productId).emit('COMMENT:REFRESH', Product)
        return comment
    }
}