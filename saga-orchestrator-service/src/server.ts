import * as dotenv from 'dotenv'

dotenv.config()

import express from 'express';
import bodyParser from 'body-parser';
import rabbitService from "./services/queue/rabbit.service";
import logger from "./helpers/logger";

const app = express()
const PORT = process.env.PORT || 3006

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log('SAGA SERVER IS RUNNING ON PORT ' + PORT)
})
rabbitService.listenForEvents("newUser", (event) => rabbitService.addNewSubscriber(event)).then(() => logger.info('Start listening for adding new subscription'))

export default app