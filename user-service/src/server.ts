import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'

import { dataSource } from './data-access/config/dataSource'
import userRoute from './router/routers/user.router'

const app = express()
// const PORT = process.env.PORT || 3001
const PORT = 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/subscribe', userRoute)

dataSource
    .initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log('USER SERVER IS RUNNING ON PORT ' + PORT)
        })

    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error)
    })


export default app
