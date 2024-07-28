import dotenv from 'dotenv'
dotenv.config()

import './service/schedule/email.service'
import rateRoute from './router/routers/rate.router'
import userRoute from './router/routers/user.router'

import express from 'express'
import bodyParser from 'body-parser'

import { dataSource } from './data-access/config/dataSource'

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
