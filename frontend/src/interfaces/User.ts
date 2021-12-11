export interface CreateUser {
    name: string
    email: string
    password?: string
}

export interface User {
    uuid: string
    name: string
    wallet: number
    isAdmin: boolean
}
