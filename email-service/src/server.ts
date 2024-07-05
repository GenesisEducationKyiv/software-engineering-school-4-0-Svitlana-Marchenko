import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import emailService from "./services/scheduler/email.service";

const app = express()
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('EMAIL SERVER IS RUNNING ON PORT ' + PORT)
    emailService.start();
})

export default app
