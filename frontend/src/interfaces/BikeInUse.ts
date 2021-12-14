import Bike from './Bike'
import { User } from './User'

export default interface BikeInUse {
    uuid: string
    bike: Bike
    timeHired: Date
    user: User
}
