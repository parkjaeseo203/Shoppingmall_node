
//1
const mongoose = require('mongoose')

//2
const productSchema = mongoose.Schema({
    //4
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})





//3
module.exports = mongoose.model("product", productSchema)
