import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import emailService from "./services/scheduler/email.service";

const app = express()
// const PORT = process.env.PORT || 3003
const PORT = 3003


app.listen(PORT, () => {
    console.log('RATE SERVER IS RUNNING ON PORT ' + PORT)
    emailService.start();
})

export default app
