import { EnumLoginType, TLoginGoogle, TLoginLocal, TLogout, TUserAction, TUserState, UserActionEnum } from "../../types/reducer/userReducer.type";

const defaultState: TUserState = {
    typeLogin: EnumLoginType.LOCAL,
    isAuth: false,
    token: null
}

export const userReducer = (state = defaultState, action: TUserAction): TUserState => {
    switch(action.type){
        case UserActionEnum.LOGIN_LOCAL:
            return { token: action.payload, isAuth: true, typeLogin: EnumLoginType.LOCAL }
        case UserActionEnum.LOGIN_GOOGLE:
            return { token: action.payload, isAuth: true, typeLogin: EnumLoginType.GOOGLE }
        case UserActionEnum.LOGOUT:
            return { ...state, token: null, isAuth: false }
        default:
            return state
    }
}

export const LoginLocal = ( token: string ): TLoginLocal => ({ type: UserActionEnum.LOGIN_LOCAL, payload: token })
export const LoginGoogle = ( token: string ): TLoginGoogle => ({ type: UserActionEnum.LOGIN_GOOGLE, payload: token })
export const Logout = (): TLogout => ({ type: UserActionEnum.LOGOUT })