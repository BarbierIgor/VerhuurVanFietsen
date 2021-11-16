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
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @Column()
  ratingOutOfFive?: number

  @Column('longtext')
  description?: string

  @OneToOne(() => HiredHistory)
  @JoinColumn()
  hiredhistory?: HiredHistory

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user?: User
}
