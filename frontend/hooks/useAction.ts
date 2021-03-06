import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { addPizzaToBasket, removePizzaToBasket, setAllPrice, setCountPrice, clearBasket } from "../store/reducer/basketReducer"
import { LoginLocal, Logout, LoginGoogle, setUserLocal} from "../store/reducer/userReducer"

const actionCreater = {
    addPizzaToBasket,
    removePizzaToBasket,
    setAllPrice,
    setCountPrice,
    clearBasket,
    LoginLocal,
    LoginGoogle,
    setUserLocal,
    Logout
}

export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionCreater, dispatch)
}   
