import { plainToClass } from 'class-transformer'
import { Connection, getRepository } from 'typeorm'
import { BikeStorage } from '../entity/bikeStorage'
import { Bike } from '../entity/bike'
import { Config } from '../entity/config'

import bikeStorages from './bicycleStorages.json'
import bikes from './bikes.json'

const seedDatabase = async (connection: Connection) => {
  const dbIsSeeded = await getRepository(Config).findOne('seeded')
  if (dbIsSeeded === undefined) {
    await connection.manager.save(plainToClass(BikeStorage, bikeStorages))
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
