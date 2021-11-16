import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BicycleStorage } from './bicycleStorage'
import { Bike } from './bike'
import { User } from './user'

@Entity('hiredHistory')
export class HiredHistory {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @ManyToOne(() => Bike)
  @JoinColumn({ name: 'bike_id' })
  bike?: Bike

  @ManyToOne(() => BicycleStorage)
  @JoinColumn({ name: 'bicycle_torage_id' })
  bicycleStorage?: BicycleStorage

  @Column('float')
  price?: number

  @Column('boolean')
  paid?: boolean
}
