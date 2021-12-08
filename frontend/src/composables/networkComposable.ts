import CreateUser from '../interfaces/User'

const baseUrl = 'http://localhost:3001'
const cache = {}

export const useNetwork = () => {}

export const post = (endpoint: string, data: CreateUser, token: string) => {
    console.log(data)
    const res = fetch(`${baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.error(error))
    return res
}
