import { BasketActionEnum, TBasketAction, TBasketState, AddBasket, RemoveBasket } from "../../types/reducer/baskeReducer.type"
import { TPizza } from "../../types/pizza.type"

const defaultState: TBasketState = {
    basketPizza: []
}

export const basketReducer = (state = defaultState, action: TBasketAction): TBasketState => {
    switch(action.type){
        case BasketActionEnum.ADD_BASKET_ITEM:
            state = {...state, basketPizza: [...state.basketPizza, action.payload]}
            localStorage.setItem('pizzaBasket', JSON.stringify(state.basketPizza))
            return state
        case BasketActionEnum.REMOVE_BASKET_ITEM:
            state = {...state, basketPizza: state.basketPizza.filter(pizza => pizza._id !== action.payload )}
            localStorage.setItem('pizzaBasket', JSON.stringify(state.basketPizza))
            return state
        default:
            return state
    }
}

export const addPizzaToBasket = (payload: TPizza): AddBasket => ({ type: BasketActionEnum.ADD_BASKET_ITEM, payload })
export const removePizzaToBasket = (payload: string): RemoveBasket => ({ type: BasketActionEnum.REMOVE_BASKET_ITEM, payload })