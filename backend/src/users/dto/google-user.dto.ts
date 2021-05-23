import { IsNotEmpty, IsString } from "class-validator"

export class CreateGoogleUserDto{
    @IsNotEmpty()
    @IsString()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly googleId: string

    @IsNotEmpty()
    @IsString()
    readonly nicname: string

    readonly icon?: string
}