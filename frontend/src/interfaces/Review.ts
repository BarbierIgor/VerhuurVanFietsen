import HiredHistory from './HiredHistory'
import { User } from './User'

export default interface Review {
    id: string
    rating: number
    description: string
    hiredhistory: HiredHistory
    user: User
}
