import dotenv from 'dotenv'
dotenv.config()

import './schedule/email.service'
import rateRoute from './routers/rate.router'
import userRoute from './routers/user.router'

import express from 'express'
import bodyParser from 'body-parser'

import { dataSource } from './dataSource'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/rate', rateRoute)
app.use('/api/subscribe', userRoute)

dataSource
    .initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log('SERVER IS RUNNING ON PORT ' + PORT)
        })
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error)
    })


export default app
