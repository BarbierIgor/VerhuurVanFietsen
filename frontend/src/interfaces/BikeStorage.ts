import Bike from './Bike'
import Prices from './Prices'

export default interface BikeStorage {
    uuid: string
    city: string
    street: string
    houseNumber: number
    prices: Prices
    bikesAvailable: number
    bikes: Array<Bike>
}
