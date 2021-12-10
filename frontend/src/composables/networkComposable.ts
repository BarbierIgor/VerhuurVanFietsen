import CreateUser from '../interfaces/User'

const baseUrl = 'http://localhost:3001'
const cache = {}

export const useNetwork = () => {}

export async function get(endpoint: string, token: string) {
    const res = await fetch(`${baseUrl}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => res.json())
        .catch(error => console.error(error))
    return res
}

export async function post(endpoint: string, data: CreateUser, token: string) {
    const res = await fetch(`${baseUrl}/${endpoint}`, {
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
