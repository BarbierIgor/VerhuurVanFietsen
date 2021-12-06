import { Resolver, Query, Arg } from 'type-graphql'
import { BikeStorage } from '../entity/bikeStorage'

@Resolver()
export class BikeStorageResolver {
  @Query(() => [BikeStorage])
  async getBikeStorages(): Promise<BikeStorage[]> {
    return await BikeStorage.createQueryBuilder('bikeStorages')
      .leftJoinAndSelect('bikeStorages.bikes', 'bike')
      .getMany()
  }
}
