import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, InputType, Int, ObjectType } from 'type-graphql'
import GraphQLJSON from 'graphql-type-json'
import { Bike } from './bike'

@ObjectType()
@InputType('BikeStorageInput')
@Entity('bikeStorage')
export class BikeStorage extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  uuid?: string

  @Field()
  @Column('text')
  city?: string

  @Field()
  @Column('text')
  street?: string

  @Field(() => Int)
  @Column()
  houseNumber?: number

  @Field(() => GraphQLJSON)
  @Column('simple-json')
  prices?: Record<string, string>

  @Field(() => Boolean, { nullable: true })
  bikesAvailable?: number

  @Field(() => Int, { nullable: true })
  capacity?: number

  @Field(type => [Bike])
  @OneToMany(() => Bike, bike => bike.bikeStorage)
  bikes?: Bike[]
}
