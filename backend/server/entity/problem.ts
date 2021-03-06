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

  @Column('text', { nullable: true })
  description?: string

  @Column('date')
  date!: Date

  @Column('simple-array', { nullable: true })
  imageUrls?: string[]

  @ManyToOne(() => Bike, b => b.id)
  @JoinColumn({ name: 'bikeId' })
  bike?: Bike

  @ManyToOne(() => BikeStorage, bs => bs.id)
  @JoinColumn({ name: 'bikeStorageId' })
  bikeStorage?: BikeStorage
}
