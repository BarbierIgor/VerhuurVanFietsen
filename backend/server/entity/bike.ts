import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  //   bicycle storage
  @ManyToOne(() => BicycleStorage, bs => bs.bikes)
  bicycleStorage?: BicycleStorage
}
