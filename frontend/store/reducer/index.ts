import { combineReducers } from "redux";
import { basketReducer } from "./basketReducer"
import { userReducer } from "./userReducer"

export const rootReducer = combineReducers({
    basketReducer,
    userReducer
})

export type TRootState = ReturnType<typeof rootReducer>