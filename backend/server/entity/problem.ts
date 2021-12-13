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
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column('text')
  category!: string

  @Column('text')
  description!: string

  @Column('date')
  date!: Date

  @ManyToOne(() => Bike, b => b.id)
  @JoinColumn({ name: 'bikeId' })
  bike?: Bike

  @ManyToOne(() => BikeStorage, bs => bs.id)
  @JoinColumn({ name: 'bikeStorageId' })
  bikeStorage?: BikeStorage
}
