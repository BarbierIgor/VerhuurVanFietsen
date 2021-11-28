import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BikeStorage } from './bikeStorage'

@Entity('bikes')
export class Bike {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @Column('text')
  type!: string

  @Column('boolean')
  inStorage!: boolean

  @Column('simple-json')
  location!: Record<string, string>

  @ManyToOne(() => BikeStorage, bs => bs.uuid)
  @JoinColumn({ name: 'bikeStorageId' })
  bikeStorage!: BikeStorage
}
