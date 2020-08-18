
const express = require('express')
const morgan = require('morgan')
const app = express()


const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')

// 미들웨어 설정
app.use(morgan('dev'))





// 라우팅
app.use('/product', productRoute)
app.use('/order', orderRoute)


const port = 4275

app.listen(port, console.log('server started'))


