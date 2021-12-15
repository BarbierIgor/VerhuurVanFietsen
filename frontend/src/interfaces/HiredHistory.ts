import Bike from './Bike'
import { User } from './User'

export default interface HiredHistory {
    id: number
    bike: Bike
    timeHiredStart: Date
    timeHiredEnd: Date
    user: User
    paid: boolean
    price: number
}
