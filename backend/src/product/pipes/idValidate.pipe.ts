import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import * as Mongoose from "mongoose";

@Injectable()
export class IdValidatePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(!Mongoose.Types.ObjectId.isValid(value)) {
            throw new BadRequestException('id is not type ObjectId')
        }
        return value
    }
}