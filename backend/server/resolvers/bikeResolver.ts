import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { Bike, CreateBikeInput } from '../entity/bike'

@Resolver()
export class BikeResolver {
  @Query(() => [Bike])
  async getBikes(): Promise<Bike[]> {
    return await Bike.createQueryBuilder('bikes')
      .leftJoinAndSelect('bikes.bikeStorage', 'bikeStorage')
      .getMany()
  }

  @Query(() => Bike)
  async getBikeById(@Arg('id') id: string): Promise<Bike | undefined | null> {
    return await Bike.createQueryBuilder('bike')
      .leftJoinAndSelect('bike.bikeStorage', 'bikeStorage')
      .where('bike.uuid = :id', { id: id })
      .getOne()
  }

  @Mutation(() => Bike, { nullable: true })
  async createBike(
    @Arg('data') newBikeData: CreateBikeInput,
  ): Promise<Bike | undefined | null> {
    console.log(newBikeData)
    const result = await Bike.save(newBikeData)
    return result
  }
}
