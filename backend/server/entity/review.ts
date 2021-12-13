import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  MaxKey,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { HiredHistory } from './hiredHistory'
import { User } from './user'

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('increment')
  uuid?: number

  @Column()
  rating!: number

  @Column('longtext')
  description?: string

  @OneToOne(() => HiredHistory)
  @JoinColumn()
  hiredhistory!: HiredHistory

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User
}
