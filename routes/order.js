
const express = require('express')
const router = express.Router()

const orderModel = require('../models/order')
//order 불러오기

router.get('/', (req, res) => {

    orderModel
        .find()
        .populate("product", ["name", "price"])
        .then(docs => {
            res.json({
                message: 'Successfully get your Items',
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity
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
    //     message: 'order 불러오기'
    // })
})

router.get('/:productID', (req, res) => {
    orderModel
        .findById(req.params.productID)
        .populate("product", ["name", "price"])
        .then(doc => {
            res.json({
                message: 'Successfully take a ' + req.params.productID,
                productInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity

                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

//order 등록하기

router.post('/', (req, res) => {

    const newOrder = new orderModel({
        product: req.body.productID,
        quantity: req.body.qty
    })

    newOrder
        .save()
        .then(doc => {
            res.json({
                message: 'Order saved',
                orderInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })


    // res.json({
    //     message: 'order 등록하기'
    // })
})


//order 업데이트하기

router.put('/:productID', (req, res) => {

    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops. propName] = ops.value
    }

    orderModel
        .findByIdAndUpdate(req.params.productID, {$set: updateOps})
        .then(() => {
            res.json({
                message: 'Updated orderlist at ' + req.params.productID
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
    // res.json({
    //     message: 'order 업데이트하기'
    // })
})


//order 삭제하기

router.delete('/:productID', (req, res) => {

    orderModel
        .findByIdAndDelete(req.params.productID)
        .then(() => {
            res.json({
                message: 'deleted product'
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

    // res.json({
    //     message: 'order 삭제하기'
    // })
})



module.exports = router