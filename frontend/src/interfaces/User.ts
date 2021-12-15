export interface CreateUser {
    name: string
    email: string
    password?: string
}

export interface User {
    uuid: string
    username: string
    wallet: number
    isAdmin: boolean
}

export interface EditUserName {
    uuid: string
    username: string
}

export interface EditUserEmail {
    uuid: string
    email: string
}
