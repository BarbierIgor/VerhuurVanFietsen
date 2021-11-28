import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { BikeStorage } from './bikeStorage'
import { Bike } from './bike'
import { User } from './user'

@Entity('bikeInUse')
export class BikeInUse {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @OneToOne(() => Bike)
  @JoinColumn({ name: 'bikeId' })
  bike?: Bike

  @Column('datetime')
  timeHired?: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user?: User
}
