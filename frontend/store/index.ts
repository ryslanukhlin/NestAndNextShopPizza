import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const defaultstate = {
    number: 0
}

const reducer = (state = defaultstate, action) => {
    switch(action.type){
        default:
            return state
    }
}

export const store = createStore(reducer, composeWithDevTools())