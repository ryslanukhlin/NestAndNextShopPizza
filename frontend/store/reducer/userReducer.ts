import { TLogin, TLogout, TUserAction, TUserState, UserActionEnum } from "../../types/reducer/userReducer.type";

const defaultState: TUserState = {
    isAuth: false,
    token: null
}

export const userReducer = (state = defaultState, action: TUserAction): TUserState => {
    switch(action.type){
        case UserActionEnum.LOGIN:
            return { token: action.payload, isAuth: true }
        case UserActionEnum.LOGOUT:
            return { token: null, isAuth: false }
        default:
            return state
    }
}

export const Login = ( token: string ): TLogin => ({ type: UserActionEnum.LOGIN, payload: token })
export const Logout = (): TLogout => ({ type: UserActionEnum.LOGOUT })