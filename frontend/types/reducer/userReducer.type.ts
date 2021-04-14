export type TUser = {
    _id: string
    nicname: string
    email: string
    password: string
}

export type TUserState = {
    users: TUser | null
}