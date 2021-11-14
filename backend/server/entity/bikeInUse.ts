import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { BicycleStorage } from './bicycleStorage'
import { Bike } from './bike'

@Entity('bikeInUse')
export class BikeInUse {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @OneToOne(() => Bike)
  @JoinColumn()
  bike?: Bike

  @Column('datetime')
  timeHired?: Date

  @ManyToOne(() => BicycleStorage)
  @JoinColumn({ name: 'bicyclestorage_id' })
  bicycleStorage!: BicycleStorage
}
