import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('problem')
export class Problem {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @Column('text')
  category!: string

  @Column('text')
  description!: string

  @Column('date')
  date!: Date

  // @Column('number')
  // objectId?: number
}
