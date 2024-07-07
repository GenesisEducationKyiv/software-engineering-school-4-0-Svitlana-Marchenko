import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import bodyParser from 'body-parser';
import rabbitService from "./services/queue/rabbit.service";
import logger from "./helpers/logger";
import {dataSource} from "./config/dataSource";

const app = express()
const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

rabbitService.listenForEvents("email", (event) => rabbitService.sendEmail(event)).then(() => logger.info('Start listening for event'))

export default app