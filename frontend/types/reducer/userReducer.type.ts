export enum EnumLoginType {
    GOOGLE = "GOOGLE",
    LOCAL = "LOCAL"
}

export type TUserState = {
    typeLogin: EnumLoginType
    isAuth: boolean
    token: string | null
}

export enum UserActionEnum {
    LOGIN_LOCAL = "LOGIN_LOCAL",
    LOGOUT = "LOGOUT",
    LOGIN_GOOGLE = "LOGIN_GOOGLE",
}

export type TLoginLocal = {
    type: UserActionEnum.LOGIN_LOCAL,
    payload: string
}

export type TLoginGoogle = {
    type: UserActionEnum.LOGIN_GOOGLE,
    payload: string
}

export type TLogout = {
    type: UserActionEnum.LOGOUT,
}

export type TUserAction = TLoginLocal | TLogout | TLoginGoogle