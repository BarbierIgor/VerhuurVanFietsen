import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BicycleStorage } from './bicycleStorage'
import { Bike } from './bike'

@Entity('hiredHistory')
export class HiredHistory {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  // user

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
