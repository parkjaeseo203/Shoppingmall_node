




const productModel = require('../models/product')



exports.products_get_all = (req, res) => {

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
};

exports.products_post_product = (req, res) => {


    const {name, price} = req.body;

    const newProduct = new productModel({
        name,
        price
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
};

exports.products_patch_product = (req, res) => {

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
};

exports.products_delete_product = (req, res) => {
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
};

exports.products_delete_all = (req, res) => {
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
};

exports.products_get_product = (req, res) => {

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


};