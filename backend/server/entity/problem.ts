import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Bike } from './bike'
import { BikeStorage } from './bikeStorage'

@Entity('problem')
export class Problem {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @Column('text')
  category!: string

  @Column('text')
  description!: string

  @Column('date')
  date!: Date

  @ManyToOne(() => Bike, b => b.uuid)
  @JoinColumn({ name: 'bikeId' })
  bike?: Bike

  @ManyToOne(() => BikeStorage, bs => bs.uuid)
  @JoinColumn({ name: 'bikeStorageId' })
  bikeStorage?: BikeStorage
}
