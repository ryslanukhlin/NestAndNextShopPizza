import {
    EnumLoginType,
    TLoginGoogle,
    TLoginLocal,
    TLogout, TSetUserLocal,
    TUser,
    TUserAction,
    TUserState,
    UserActionEnum
} from "../../types/reducer/userReducer.type";

const defaultState: TUserState = {
    typeLogin: EnumLoginType.LOCAL,
    isAuth: false,
    token: null,
    user: null
}

export const userReducer = (state = defaultState, action: TUserAction): TUserState => {
    switch(action.type){
        case UserActionEnum.LOGIN_LOCAL:
            return {...state, token: action.payload, isAuth: true, typeLogin: EnumLoginType.LOCAL }
        case UserActionEnum.LOGIN_GOOGLE:
            return {...state, user: action.payload, isAuth: true, typeLogin: EnumLoginType.GOOGLE }
        case UserActionEnum.LOGOUT:
            return { ...state, token: null, isAuth: false }
        case UserActionEnum.SET_USER_LOCAL:
            return { ...state, user: action.payload}
        default:
            return state
    }
}

export const LoginLocal = ( token: string ): TLoginLocal => ({ type: UserActionEnum.LOGIN_LOCAL, payload: token })
export const LoginGoogle = ( user: TUser ): TLoginGoogle => ({ type: UserActionEnum.LOGIN_GOOGLE, payload: user })
export const setUserLocal = ( user: TUser ): TSetUserLocal => ({ type: UserActionEnum.SET_USER_LOCAL, payload: user })
export const Logout = (): TLogout => ({ type: UserActionEnum.LOGOUT })