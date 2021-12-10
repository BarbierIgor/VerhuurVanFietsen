import Bike from './Bike'

export default interface BikeStorage {
    uuid: string
    city: string
    street: string
    houseNumber: number
    prices: JSON
    bikesAvailable: number
    bikes: Array<Bike>
}
