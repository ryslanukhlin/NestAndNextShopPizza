import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { addPizzaToBasket, removePizzaToBasket } from "../store/reducer/basketReducer"

const actionCreater = {
    addPizzaToBasket,
    removePizzaToBasket
}

export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionCreater, dispatch)
}   
