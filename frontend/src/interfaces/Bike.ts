import Coordinates from './Coordinates'
import BikeStorage from './BikeStorage'

export default interface Bike {
    id: number
    type: string
    inStorage: boolean
    location: Coordinates
    bikeStorage: BikeStorage
}
