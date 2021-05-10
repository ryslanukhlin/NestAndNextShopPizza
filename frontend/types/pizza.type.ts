import {TUser} from "./reducer/userReducer.type";

export type TComments = {
    _id: string
    text: string
    userId: TUser
    __v: number
}

export type TPizza = {
    image: string | null
    _id: string
    price: number
    name: string
    description: string
    comments?: TComments[]
    __v: number
}
