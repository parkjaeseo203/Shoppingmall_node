
const express = require('express')
const app = express()


// app.use((req, res) => {
//     res.json({
//         message: 'It works'
//     })
// })
const productRoute = require('./routes/product')



app.use('/product', productRoute)



const port = 4275

app.listen(port, console.log('server started'))


