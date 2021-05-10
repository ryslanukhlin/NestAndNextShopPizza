export type TUser = {
    email: string
    googleId?: string
    password?: string
    nicname: string
    type: string
    __v: number
    _id: string
}

export enum EnumLoginType {
    GOOGLE = "GOOGLE",
    LOCAL = "LOCAL"
}

export type TUserState = {
    typeLogin: EnumLoginType
    isAuth: boolean
    token: string | null
    user: TUser | null
}

export enum UserActionEnum {
    LOGIN_LOCAL = "LOGIN_LOCAL",
    LOGOUT = "LOGOUT",
    LOGIN_GOOGLE = "LOGIN_GOOGLE",
    SET_USER_LOCAL = "SET_USER_LOCAL"
}

export type TLoginLocal = {
    type: UserActionEnum.LOGIN_LOCAL,
    payload: string
}

export type TSetUserLocal = {
    type: UserActionEnum.SET_USER_LOCAL,
    payload: TUser
}

export type TLoginGoogle = {
    type: UserActionEnum.LOGIN_GOOGLE,
    payload: TUser
}

export type TLogout = {
    type: UserActionEnum.LOGOUT,
}

export type TUserAction = TLoginLocal | TLogout | TLoginGoogle | TSetUserLocal