import {
    BasketActionEnum,
    TBasketAction,
    TBasketState,
    AddBasket,
    RemoveBasket,
    SetAllPrice,
    SetCountPrice,
    TPayloadSecCountPrice,
    ClearBasket,
    TPizzaBasket
} from "../../types/reducer/baskeReducer.type"
import { TPizza } from "../../types/pizza.type"

const defaultState: TBasketState = {
    basketPizza: [],
    allPrice: 0
}

export const basketReducer = (state = defaultState, action: TBasketAction): TBasketState => {
    switch(action.type){
        case BasketActionEnum.ADD_BASKET_ITEM:
            state = {...state, basketPizza: [...state.basketPizza, {...action.payload, count: 1, countPrice: action.payload.price}]}
            localStorage.setItem('pizzaBasket', JSON.stringify(state.basketPizza))
            return state
        case BasketActionEnum.REMOVE_BASKET_ITEM:
            const newPizza: Array<TPizzaBasket> = state.basketPizza.filter(pizza => pizza._id !== action.payload )
            state = {...state, basketPizza: newPizza }
            localStorage.setItem('pizzaBasket', JSON.stringify(state.basketPizza))
            return state
        case BasketActionEnum.SET_ALLPRICE:
            const allPrice = state.basketPizza.reduce((prev, item) => prev += item.countPrice, 0)
            return {...state, allPrice}
        case BasketActionEnum.SET_COUNTPRICE:
            const newBasketPizza = state.basketPizza.map((item) => {
                if(item._id === action.payload.id){
                    item.countPrice = action.payload.count * item.price
                    item.count = action.payload.count
                }
                return item
            })
            return { ...state, basketPizza: newBasketPizza, allPrice: newBasketPizza.reduce((prev, item) => prev += item.countPrice, 0)}
        case BasketActionEnum.CLEAR_BASKET:
            localStorage.removeItem('pizzaBasket')
            return {basketPizza: [], allPrice: 0}
        default:
            return state
    }
}

export const addPizzaToBasket = (payload: TPizza): AddBasket => ({ type: BasketActionEnum.ADD_BASKET_ITEM, payload })
export const removePizzaToBasket = (payload: string): RemoveBasket => ({ type: BasketActionEnum.REMOVE_BASKET_ITEM, payload })
export const setAllPrice = (): SetAllPrice => ({ type: BasketActionEnum.SET_ALLPRICE })
export const setCountPrice = (payload: TPayloadSecCountPrice): SetCountPrice => ({ type: BasketActionEnum.SET_COUNTPRICE, payload })
export const clearBasket = (): ClearBasket => ({ type: BasketActionEnum.CLEAR_BASKET }) 