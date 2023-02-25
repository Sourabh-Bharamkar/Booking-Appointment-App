const express = require('express')
const app = express();

const path = require('path')
const bodyParser = require('body-parser')


const sequelize = require('./util/database')
const User=require('./models/user')

const userRoutes = require('./routes/user')
const errorController = require('./controllers/error');
const { urlencoded } = require('express');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(userRoutes);

app.use(errorController.get404)


sequelize.sync()
    .then((result) => {
        app.listen('3000')

    })
    .catch((error) => {
        console.log(error)
    })

