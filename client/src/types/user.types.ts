export interface IUser {
    readonly id: number
    email: string
    username: string
    avatar: string | null
    createdAt: string
}

export type LoginUserFields = {
    email: string
    password: string
}

export type RegisterUserFields = {
    username: string
    email: string
    password: string
}
