import dotenv from 'dotenv'

dotenv.config()

import rateRoute from './routers/rate.router'

import express from 'express'
import bodyParser from 'body-parser'
import {dataSource} from "./config/dataSource";

const app = express()
// const PORT = process.env.PORT || 3002
const PORT = 3002

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/rate', rateRoute)

dataSource
    .initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log('RATE SERVER IS RUNNING ON PORT ' + PORT)
        })

    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error)
    })

export default app
