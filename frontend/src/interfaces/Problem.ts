import Bike from './Bike'
import BikeStorage from './BikeStorage'

export default interface Problem {
    uuid: string
    category: string
    description: string
    date: Date
    bike: Bike
    bikeStorage: BikeStorage
}
