import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Bike } from './bike'

@Entity('bikeStorage')
export class BikeStorage {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @Column('text')
  city?: string

  @Column('text')
  street?: string

  @Column()
  houseNumber?: number

  @Column('simple-json')
  prices?: Record<string, string>

  bikesAvailable?: number

  capacity?: number

  @OneToMany(() => Bike, bike => bike.bikeStorage)
  bikes?: Bike[]
}
