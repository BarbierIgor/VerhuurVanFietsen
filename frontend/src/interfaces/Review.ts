import { HiredHistory } from './HiredHistory'
import { User } from './User'

export interface Review {
    id: string
    rating: number
    description: string
    hiredhistory: HiredHistory
    user: User
}

export interface ReviewPost {
    rating: number
    hiredhistory: number
    description: string
    user: string
}
