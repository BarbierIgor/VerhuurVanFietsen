import Bike from './Bike'
import { User } from './User'

export default interface BikeInUse {
    id: number
    bike: Bike
    timeHired: Date
    user: User
}
