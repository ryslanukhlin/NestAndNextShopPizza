import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { addPizzaToBasket, removePizzaToBasket, setAllPrice, setCountPrice, clearBasket } from "../store/reducer/basketReducer"

const actionCreater = {
    addPizzaToBasket,
    removePizzaToBasket,
    setAllPrice,
    setCountPrice,
    clearBasket
}

export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionCreater, dispatch)
}   
