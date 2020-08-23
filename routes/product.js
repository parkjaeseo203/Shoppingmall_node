

// 1
const express = require("express")
const router = express.Router();


const productModel = require('../models/product')

// product 불러오기

router.get('/', (req, res) => {

    productModel
        .find()
        .then(docs => {
            res.json({
                message: "successful product total date",
                count: docs.length,
                products: docs
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })



    // res.json({
    //     message: 'product 불러오기'
    // })
})





// product 등록하기

router.post('/', (req, res) => {

    const newProduct = new productModel({
        name: req.body.productname,
        price: req.body.productprice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                message: "saved product",
                productInfo: doc
            })
        })
        .catch(err => {
            res.json({
                massege: err.message
            })
        })

    // const newProduct = {
    //     name: req.body.productName,
    //     price: req.body.productPrice
    // }
    //
    // res.json({
    //     message: 'product 등록하기',
    //     productInfo: newProduct
    // })
})

// product 업데이트하기

router.patch('/', (req, res) => {
    res.json({
        message: 'product 업데이트하기'
    })
})


// product 삭제하기

router.delete('/', (req, res) => {
    res.json({
        message: 'product 삭제하기'
    })
})

// 2
module.exports = router;