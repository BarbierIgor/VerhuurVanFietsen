import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, InputType, ObjectType } from 'type-graphql'
import GraphQLJSON from 'graphql-type-json'

import { BikeStorage } from './bikeStorage'

@ObjectType()
@InputType('BikeInput')
@Entity('bike')
export class Bike extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @Field()
  @Column('text')
  type!: string

  @Field(() => Boolean)
  @Column('boolean')
  inStorage!: boolean

  @Field(() => GraphQLJSON)
  @Column('simple-json')
  location!: Record<string, string>

  @Field(type => BikeStorage)
  @ManyToOne(() => BikeStorage, bs => bs.uuid)
  @JoinColumn({ name: 'bikeStorageId' })
  bikeStorage!: BikeStorage
}
