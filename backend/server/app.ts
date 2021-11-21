import express, { NextFunction, Request, Response } from 'express'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm'
import { createDatabase } from 'typeorm-extension'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
// import cors from 'cors'
import {
  BicycleStorageController,
  IBicycleStorageController,
} from './controllers/bicycleStorage.controller'
import { BikeController, IBikeController } from './controllers/bike.controller'
import {
  BikeInUseController,
  IBikeInUseController,
} from './controllers/bikeInUse.controller'
import {
  HiredHistoryController,
  IHiredHistoryController,
} from './controllers/hiredHistory.controller'
import {
  ReviewController,
  IReviewController,
} from './controllers/review.controller'
import { UserController, IUserController } from './controllers/user.controller'
import { IController } from './controllers/crud.controller'
import seedDatabase from './seeders/seeder'
import authMiddleware from './auth/firebaseAuthMiddleware'
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

      app.use(express.json())
      // app.use(cors())
      // app.use(authMiddleware)

      dotenv.config() // This will load in the GOOGLE_APPLICATION_CREDENTIALS
      var serviceAccount = require('./auth/service-account.json')
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })

      interface AppControllers {
        bike: IBikeController
        bicycleStorage: IBicycleStorageController
        bikeInUse: IBikeInUseController
        hiredHistory: IHiredHistoryController
        review: IReviewController
        user: IUserController
      }

      const controllers: AppControllers = {
        bike: new BikeController(),
        bicycleStorage: new BicycleStorageController(),
        bikeInUse: new BikeInUseController(),
        hiredHistory: new HiredHistoryController(),
        review: new ReviewController(),
        user: new UserController(),
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
