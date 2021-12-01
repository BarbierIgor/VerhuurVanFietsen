import { Resolver, Query } from 'type-graphql'
import { Bike } from '../entity/bike'

// const repository = getRepository(Bike)

@Resolver()
export class BikeResolver {
  @Query(() => [Bike])
  async getBikes(): Promise<Bike[]> {
    return await Bike.createQueryBuilder('bikes')
      .leftJoinAndSelect('bikes.bikeStorage', 'bikeStorage')
      .getMany()
  }
}
