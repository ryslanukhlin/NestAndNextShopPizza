import { combineReducers } from "redux";
import { basketReducer } from "./basketReducer"

export const rootReducer = combineReducers({
    basketReducer
})

export type TRootState = ReturnType<typeof rootReducer>