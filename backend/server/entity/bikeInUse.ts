import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { Bike } from './bike'
import { User } from './user'

@Entity('bikeInUse')
export class BikeInUse {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @OneToOne(() => Bike)
  @JoinColumn({ name: 'bikeId' })
  bike!: Bike

  @Column('datetime')
  timeHired!: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User
}
