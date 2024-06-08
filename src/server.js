require('dotenv').config();
require('./helpers/emailService');

const rateRoute = require("./routes/rateRoutes")
const userRoute = require("./routes/userRoutes")

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => console.log('SERVER IS RUNNING ON PORT ' + PORT));

app.use("/api/rate", rateRoute)
app.use("/api/subscribe", userRoute)

module.exports = app;