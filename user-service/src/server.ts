import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'

import {dataSource} from './config/dataSource'
import userRoute from './routers/user.router'
import schedulerService from "./services/scheduler/scheduler.service";

const app = express()
const PORT = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api', userRoute)

dataSource
    .initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log('USER SERVER IS RUNNING ON PORT ' + PORT)
        })

        schedulerService.start()

    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error)
    })

export default app
