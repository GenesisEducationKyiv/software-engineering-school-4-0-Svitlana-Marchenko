import * as dotenv from 'dotenv'
import express from 'express'
import rabbitService from "./services/queue/rabbit.service";
import loggerBase from "./helpers/logger/logger.base";
import {LogLevel} from "./helpers/logger/logger.interface";

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('EMAIL SERVER IS RUNNING ON PORT ' + PORT)
})

rabbitService.listenForEvents("email", (event) => rabbitService.sendEmail(event)).then(() => loggerBase.log(LogLevel.Info, 'Start listening for event'))

export default app
