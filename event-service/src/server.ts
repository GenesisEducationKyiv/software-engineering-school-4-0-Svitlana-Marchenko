import express from 'express'
import bodyParser from 'body-parser'
import eventRouter from './routes/event.route'
import { connectToDatabase } from './db/mongo.connection'

const app = express()
const PORT = process.env.PORT || 3004

app.use(bodyParser.json())

connectToDatabase()
   .then(() => {
      app.use('/api', eventRouter)

      app.listen(PORT, () => {
         console.log('EVENT SERVER IS RUNNING ON PORT ' + PORT)
      })
   })
   .catch((error: Error) => {
      console.error('Database connection failed', error)
   })

export default app
