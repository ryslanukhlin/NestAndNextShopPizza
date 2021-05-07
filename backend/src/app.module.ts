import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductModule } from './product/product.module';
import { FileModule } from './file/file.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import * as path from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRoot(process.env.mongodbUri),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        ProductModule,
        FileModule,
        OrderModule,
        AuthModule,
        UsersModule,
        CommentsModule
    ]
})
export class AppModule {}
