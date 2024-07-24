import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import bodyParser from 'body-parser';
import rabbitService from "./services/queue/rabbit.service";
import logger from "./helpers/logger";
import metricRoute from './routers/metric.router'
import {dataSource} from "./config/dataSource";
import emailSchedularService from "./services/scheduler/email.schedular.service";

const app = express()
const PORT = process.env.PORT || 3003

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/metrics', metricRoute)

dataSource
    .initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log('EMAIL SERVER IS RUNNING ON PORT ' + PORT)
        })

    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error)
    })

rabbitService.listenForEvents("emailSubscribe", (event) => rabbitService.addUser(event)).then(() => logger.info('Start listening for subscription'))
rabbitService.listenForEvents("emailUnsubscribe", (event) => rabbitService.removeUser(event)).then(() => logger.info('Start listening for unsubscription'))
rabbitService.listenForEvents("rate", (event) => rabbitService.changeRate(event)).then(() => logger.info('Start listening for changing rate'))

emailSchedularService.start()
export default app