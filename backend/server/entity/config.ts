import 'reflect-metadata'
import { Entity, BaseEntity, Column } from 'typeorm'

@Entity('config') // The table name
export class Config extends BaseEntity {
  @Column({ unique: true, primary: true })
  key!: string

  @Column()
  value!: string
}
