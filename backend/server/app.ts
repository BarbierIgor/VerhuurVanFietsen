import express from 'express'
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm'
import { createDatabase } from 'typeorm-extension'
;(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions() // This line will get the connection options from the typeorm
  createDatabase({ ifNotExist: true }, connectionOptions)
    .then(() => console.log('Database created successfully!'))
    .then(createConnection)
    .then(async () => {
      const app = express(),
        port = process.env.PORT || 3001

      // The rest of the app methods

      app.listen(port, () => {
        // The correct way is to use the callback method to properly log when the app starts listening
        console.info(`\nServer 👾 \nListening on http://localhost:${port}/`)
      })
    })
    .catch(error => console.error(error)) // If it crashed anywhere, let's log the error!
})()
