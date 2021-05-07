import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Express } from 'express';
import { FileService } from 'src/file/file.service';
import { FuleTypeEnum } from '../file/enum/type-file.enum';
import { IdValidatePipe } from './pipes/idValidate.pipe';
import {ProductDocument} from "./schemas/product.schema";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService,
                private readonly fileService: FileService){}

    @Get()
    async getPizza(){
        return await this.productService.getPizza()
    }

    @Get(':id')
    @UsePipes(new IdValidatePipe())
    async getPizzaById(@Param('id') id: ProductDocument){
        return await this.productService.getPizzaById(id)
    }
    
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async createProduct(@UploadedFile() image: Express.Multer.File, @Body() createProductDto: CreateProductDto){
        const imagePath = await this.fileService.createImage(image, FuleTypeEnum.image)
        return await this.productService.createProduct(createProductDto, imagePath)
    }
}
