import { Resolver, Query, Arg } from 'type-graphql'
import { Bike } from '../entity/bike'

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
}
