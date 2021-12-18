import Bike from './Bike'
import { User } from './User'

export interface BikeInUse {
    id: number
    bike: Bike
    timeHired: Date
    user: User
}

export interface BikeInUsePost {
    bike: number
    user: string
}
