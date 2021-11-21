import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config() // This will load in the GOOGLE_APPLICATION_CREDENTIALS
var serviceAccount = require('./service-account.json')
admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
  },
  'verifyAdmin',
)

export const verifyToken = (token: string) => {
  return new Promise(function (resolve, reject) {
    admin
      .auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        resolve(decodedToken)
      })
      .catch(error => {
        reject(error)
      })
  })
}
