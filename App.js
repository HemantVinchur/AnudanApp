const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const URI = "mongodb://localhost:27017/anudan_app";
mongoose.connect(URI, { useNewUrlParser: true })
    .then(() => {
        console.log("This is my database for anudan app")
        console.log("DB connected");
    }).catch((error) => {
        console.error("Db Error: ", error);
        process.exit(1);
    });


app.use('/api', routes);

app.use(errors());

app.use(function (req, res, next) {
    res.status(404).json({
        statusCode: 404,
        message: "Not found",
        data: {}
    });
});

app.listen(2000, () => {
    console.log("server is running @2000")
});