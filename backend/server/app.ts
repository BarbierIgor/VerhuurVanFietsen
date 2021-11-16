import express from 'express'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm'
import { createDatabase } from 'typeorm-extension'
import { BikeController, IBikeController } from './controllers/bike.controller'
import { IController } from './controllers/crud.controller'
import seedDatabase from './seeders/seeder'
;(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions() // This line will get the connection options from the typeorm
  createDatabase({ ifNotExist: true }, connectionOptions)
    .then(() => console.log('Database created successfully!'))
    .then(createConnection)
    .then(async (connection: Connection) => {
      seedDatabase(connection)

      // APP SETUP
      const app = express(),
        port = process.env.PORT || 3001

      interface AppControllers {
        bike: IBikeController
      }

      const controllers: AppControllers = {
        bike: new BikeController(),
      }

      Object.entries(controllers).forEach((entry: any) => {
        const key = entry[0] as string,
          controller = entry[1] as IController
        app.use(`/${key}`, controller.router)
      })

      app.listen(port, () => {
        // The correct way is to use the callback method to properly log when the app starts listening
        console.info(`\nServer 👾 \nListening on http://localhost:${port}/`)
      })
    })
    .catch(error => console.error(error)) // If it crashed anywhere, let's log the error!
})()
