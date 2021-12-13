import Bike from './Bike'
import BikeStorage from './BikeStorage'

export interface Problem {
    id: number
    category: string
    description: string
    date: Date
    bike: Bike
    bikeStorage: BikeStorage
}

export interface NewBikeProblem {
    category: string
    description: string
    bikeId: number
}

export interface NewBikeStorageProblem {
    category: string
    description: string
    bikeStorageId: number
}

export interface NewBikeUnrecognizedProblem {
    category: string
    bikeId: number
}

export interface NewOtherProblem {
    category: string
    description: string
}
