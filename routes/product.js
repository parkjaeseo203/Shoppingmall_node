

// 1
const express = require("express")
const router = express.Router();
const checkAuth = require('../middleware/check-auth')


const {
    products_get_all,
    products_post_product,
    products_patch_product,
    products_delete_product,
    products_delete_all,
    products_get_product
} = require('../controllers/product')



// total product 불러오기

router.get('/', products_get_all)

//get detail product

router.get('/:productId', checkAuth, products_get_product)

// product 등록하기

router.post('/', checkAuth, products_post_product)

// product 업데이트하기

router.patch('/:productId', checkAuth, products_patch_product)

// product 삭제하기

router.delete('/:productId', checkAuth, products_delete_product)

//전체삭제

router.delete('/', products_delete_all)


// 2
module.exports = router;