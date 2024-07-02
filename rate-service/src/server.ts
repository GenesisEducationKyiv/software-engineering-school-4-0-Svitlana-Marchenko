import dotenv from 'dotenv'

dotenv.config()

import rateRoute from './routers/rate.router'

import express from 'express'
import bodyParser from 'body-parser'

const app = express()
// const PORT = process.env.PORT || 3002
const PORT = 3002

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/rate', rateRoute)

app.listen(PORT, () => {
    console.log('SERVER IS RUNNING ON PORT ' + PORT)
})

export default app
