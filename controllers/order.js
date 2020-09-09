


const orderModel = require('../models/order')

exports.order_get_all = (req, res) => {

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
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4275/order/' + doc._id
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
    //     message: 'order 불러오기'
    // })
};

exports.order_get_order = (req, res) => {
    orderModel
        .findById(req.params.productID)
        .populate("product", ["name", "price"])
        .then(doc => {
            res.json({
                message: 'Successfully take a ' + req.params.productID,
                productInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4275/order'
                    }

                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
};

exports.order_post_order = (req, res) => {

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
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4275/order/' + doc._id
                    }
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
};

exports.order_put_order = (req, res) => {

    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops. propName] = ops.value
    }

    orderModel
        .findByIdAndUpdate(req.params.productID, {$set: updateOps})
        .then(() => {
            res.json({
                message: 'Updated orderlist at ' + req.params.productID,
                request: {
                    type: 'GET',
                    url: 'http://localhost:4275/order/' + req.params.productID
                }
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
};

exports.order_delete_all = (req, res) => {

    orderModel
        .findByIdAndDelete(req.params.productID)
        .then(() => {
            res.json({
                message: 'deleted product',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4275/order'
                }
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
};