import { CreateUser, User } from '../interfaces/User'

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

export async function post(endpoint: string, data: any, token: string) {
    const res = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.error(error))
    return res
}

export async function put(endpoint: string, data: any, token: string) {
    const res = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(error => console.error(error))
    return res
}

export async function remove(endpoint: string, token: string) {
    const res = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => res.json())
        .catch(error => console.error(error))
    return res
}
