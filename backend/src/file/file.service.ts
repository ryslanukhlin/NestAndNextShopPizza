import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Express } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { FuleTypeEnum } from './enum/type-file.enum';

@Injectable()
export class FileService {
    async createImage(image: Express.Multer.File, typeFile: FuleTypeEnum){
        try{
            const fileExist = image.originalname.split('.').pop()
            const filePath = path.resolve(__dirname, '..', 'static', typeFile)
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, { recursive: true })
            }
            const fileName = uuid.v4() + '.' + fileExist
            fs.writeFileSync(path.resolve(filePath, fileName), image.buffer)
            return typeFile + "/" + fileName
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
