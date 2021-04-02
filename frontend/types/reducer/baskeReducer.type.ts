import { TPizza } from "../pizza.type";

type TBasketPizza = {
    count: number,
    countPrice: number
}

export type TPizzaBasket = TPizza & TBasketPizza

export type TBasketState = {
    basketPizza: TPizzaBasket[],
    allPrice: number
}

export enum BasketActionEnum {
    ADD_BASKET_ITEM = "ADD_BASKET_ITEM",
    REMOVE_BASKET_ITEM = "REMOVE_BASKET_ITEM",
    SET_ALLPRICE = "SET_ALLPRICE",
    SET_COUNTPRICE = "SET_COUNTPRICE"
}

export type AddBasket = {
    type: BasketActionEnum.ADD_BASKET_ITEM
    payload: TPizza
}

export type RemoveBasket = {
    type: BasketActionEnum.REMOVE_BASKET_ITEM
    payload: string
}

export type SetAllPrice = {
    type: BasketActionEnum.SET_ALLPRICE
}

export type TPayloadSecCountPrice = {
    count: number,
    id: string
}

export type SetCountPrice = {
    type: BasketActionEnum.SET_COUNTPRICE,
    payload: TPayloadSecCountPrice
}

export type TBasketAction = AddBasket | RemoveBasket | SetAllPrice | SetCountPrice;