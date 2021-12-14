import HiredHistory from './HiredHistory'
import { User } from './User'

export default interface Review {
    uuid: string
    rating: number
    description: string
    hiredhistory: HiredHistory
    user: User
}
