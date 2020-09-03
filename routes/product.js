

// 1
const express = require("express")
const router = express.Router();


const productModel = require('../models/product')

// total product 불러오기

router.get('/', (req, res) => {

    productModel
        .find()
        .then(docs => {
            res.json({
                message: "successful product total date",
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: 'GET',
                            url: "http://localhost:4275/product/" + doc._id
                        }
                    }
                })
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


//get detail product

router.get('/:productId', (req, res) => {

    productModel
        .findById(req.params.productId)
        .then(doc => {
            res.json({
                message: "Successful get product at " + req.params.productId,
                productInfo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request:  {
                        type: 'GET',
                        url: "http://localhost:4275/product"
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })


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
                productInfo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: 'GET',
                        url: "http://localhost:4275/product/" + doc._id
                    }
                }
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

router.patch('/:productId', (req, res) => {

    // 업데이트 내용
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }


    productModel
        .findByIdAndUpdate(req.params.productId, {$set: updateOps})
        .then(() => {
            res.json({
                message: 'updated product at ' + req.params.productId,
                request: {
                    type: 'GET',
                    url: "http://localhost:4275/product/" + req.params.productId
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
    // res.json({
    //     message: 'product 업데이트하기'
    // })
})


// product 삭제하기

router.delete('/:productId', (req, res) => {
    // res.json({
    //     message: 'product 삭제하기'
    // })
    productModel
        .findByIdAndDelete(req.params.productId)
        .then(() => {
            res.json({
                message: 'deleted product',
                request: {
                    type: 'GET',
                    url: "http://localhost:4275/product"
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

//전체삭제

router.delete('/', (req, res) => {
    productModel
        .remove()
        .then(() => {
            res.json({
                message: 'deleted products'
            })
        })
        .catch(err => {
            res.json({
                message: err.massege
            })
        })
})


// 2
module.exports = router;