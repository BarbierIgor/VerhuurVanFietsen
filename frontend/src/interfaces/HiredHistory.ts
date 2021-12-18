import Bike from './Bike'
import { User } from './User'

export interface HiredHistory {
    id: number
    bike: Bike
    timeHiredStart: Date
    timeHiredEnd: Date
    user: User
    paid: boolean
    price: number
}

export interface HiredHistoryPost {
    bikeInUse: number
    user: string
}
