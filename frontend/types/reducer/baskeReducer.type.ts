import { TPizza } from "../pizza.type";

export type TBasketState = {
    basketPizza: TPizza[]
}

export enum BasketActionEnum {
    ADD_BASKET_ITEM = "ADD_BASKET_ITEM",
    REMOVE_BASKET_ITEM = "REMOVE_BASKET_ITEM"
}

export type AddBasket = {
    type: BasketActionEnum.ADD_BASKET_ITEM
    payload: TPizza
}

export type RemoveBasket = {
    type: BasketActionEnum.REMOVE_BASKET_ITEM
    payload: string
}

export type TBasketAction = AddBasket | RemoveBasket;