import express from 'express';
import bodyParser from 'body-parser';
import eventRouter from './routes/event.route';
import {dataSource} from "./config/dataSource";

const app = express();
const PORT = process.env.PORT || 3004

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', eventRouter)

dataSource
    .initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log('EVENT SERVER IS RUNNING ON PORT ' + PORT)
        })

    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error)
    })

export default app