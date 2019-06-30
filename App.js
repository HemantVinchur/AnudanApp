const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const Donar = require('./models/Donar')
const Admin = require('./models/Admin')
const validators = require('./validators')
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/signupdonor.html',(req,res)=>{
    res.sendFile(path.join(_dirname,'signupdonor.html'))
})
 
app.get('/logindonor.html',(req,res)=>{
    res.sendFile(path.join(_dirname,'logindonor.html'))
})
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
        data: data
    })
})

//errorhandler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    return res
        .status(200)
        .json({
            statusCode: err.output.payload.statusCode,
            message: err.output.payload.message,
            data: {}
        })
})

app.use((err, req, res, next) => {

    res.locals.message = err.message;
})
app.listen(6000, () => {
    console.log("server is running @6000")
})