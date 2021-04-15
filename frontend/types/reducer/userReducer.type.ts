export type TUserState = {
    isAuth: boolean
    token: string | null
}

export enum UserActionEnum {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

export type TLogin = {
    type: UserActionEnum.LOGIN,
    payload: string
}

export type TLogout = {
    type: UserActionEnum.LOGOUT,
}

export type TUserAction = TLogin | TLogout