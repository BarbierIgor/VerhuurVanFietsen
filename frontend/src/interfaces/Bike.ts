import Coordinates from './Coordinates'
import BikeStorage from './BikeStorage'

export default interface Bike {
    uuid: string
    type: string
    inStorage: boolean
    location: Coordinates
    bikeStorage: BikeStorage
}
