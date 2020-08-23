
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()


// 데이터베이스 연결


const dbAdress = "mongodb+srv://bangnany:4275@cluster0.kgd8x.mongodb.net/Shoppingmall?retryWrites=true&w=majority"

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(dbAdress, dbOptions)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))



const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')

// 미들웨어 설정
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))




// 라우팅
app.use('/product', productRoute)
app.use('/order', orderRoute)


const port = 4275

app.listen(port, console.log('server started'))


