import { plainToClass } from 'class-transformer'
import { Connection, getRepository } from 'typeorm'
import { BicycleStorage } from '../entity/bicycleStorage'
import { Bike } from '../entity/bike'
import { Config } from '../entity/config'

import bicycleStorages from './bicycleStorages.json'
import bikes from './bikes.json'

const seedDatabase = async (connection: Connection) => {
  const dbIsSeeded = await getRepository(Config).findOne('seeded')
  if (dbIsSeeded === undefined) {
    await connection.manager.save(plainToClass(BicycleStorage, bicycleStorages))
    await connection.manager.save(plainToClass(Bike, bikes))

    // Mark as seeded.
    const seeded = new Config()
    seeded.key = 'seeded'
    seeded.value = 'true'
    await connection.manager.save(seeded)

    console.log('I have seeded the database with everything necessary!')
  } else {
    console.log('The database has already been seeded before.')
  }
}
export default seedDatabase
