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
  @JoinColumn({ name: 'userId' })
  user?: User

  @ManyToOne(() => Bike)
  @JoinColumn({ name: 'bikeId' })
  bike?: Bike

  @ManyToOne(() => BicycleStorage)
  @JoinColumn({ name: 'bicycleStorageId' })
  bicycleStorage?: BicycleStorage

  @Column('float')
  price?: number

  @Column('boolean')
  paid?: boolean
}
