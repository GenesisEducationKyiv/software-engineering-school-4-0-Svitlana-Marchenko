import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import rabbitService from "./services/queue/rabbit.service";
import logger from "./helpers/logger";

const app = express()
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('EMAIL SERVER IS RUNNING ON PORT ' + PORT)

})

rabbitService.listenForEvents("email", (event) => rabbitService.sendEmail(event)).then(() => logger.info('Start listening for event'))

export default app
