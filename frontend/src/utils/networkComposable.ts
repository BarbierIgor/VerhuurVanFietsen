const baseUrl = 'http://localhost:3000'

const cache = {}

// export const useNetwork = () => {

//     const get = (endpoint: string) =>
//         fetch(`${baseUrl}/${endpoint}`).then(r => r.json())

//     return {
//         get,
//     }

// }

import data from '../utils/data.json'

export const useNetwork = () => {
    const get = (endpoint: string) => {
        const endpointSplit = endpoint.split('/')
        if (endpoint == 'stations/all') {
            return data
        } else if (endpointSplit[1] == 'id') {
            return data.filter(bikeStation => (bikeStation.street = endpointSplit[2]))
        }
    }
    
    return {
        get,
    }

}