import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BicycleStorage } from './bicycleStorage'

@Entity('bikes')
export class Bike {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @Column('text')
  type?: string

  @Column('boolean')
  inStorage?: boolean

  @Column('simple-json')
  location?: Record<string, string>

  @ManyToOne(() => BicycleStorage, bs => bs.uuid)
  @JoinColumn({ name: 'bicycleStorageId' })
  bicycleStorage!: BicycleStorage
}
