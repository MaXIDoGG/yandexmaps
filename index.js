const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.static('public'))
app.use(cookieParser('1234'))
app.use(express.json())
app.use('/', authRouter)

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true);


const port = process.env.PORT || 3000

async function start() {
    try {
        await mongoose.connect('mongodb+srv://maxidogg:197213Mn@cluster0.nwkzj.mongodb.net/yandexMaps?retryWrites=true&w=majority')
        app.listen(port, () => {
        console.log('Server started...')
        })
    } catch (e) {
        console.log(e)
    }
}

start()