import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Bike } from './bike'

@Entity('bicycleStorage')
export class BicycleStorage {
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

  @OneToMany(() => Bike, bike => bike.bicycleStorage)
  bikes?: Bike[]
}
