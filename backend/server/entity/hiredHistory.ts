import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BikeStorage } from './bikeStorage'
import { Bike } from './bike'
import { User } from './user'

@Entity('hiredHistory')
export class HiredHistory {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user?: User

  @ManyToOne(() => Bike)
  @JoinColumn({ name: 'bikeId' })
  bike?: Bike

  @ManyToOne(() => BikeStorage)
  @JoinColumn({ name: 'bicycleStorageId' })
  bicycleStorage?: BikeStorage

  @Column('float')
  price?: number

  @Column('boolean')
  paid?: boolean

  @Column('datetime')
  timeHiredStart?: Date

  @Column('datetime')
  timeHiredEnd?: Date
}
