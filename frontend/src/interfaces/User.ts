export default interface CreateUser {
    name: string
    email: string
    password?: string
}

export default interface User {
    uuid: string
    name: string
    wallet: number
    isAdmin: boolean
}
