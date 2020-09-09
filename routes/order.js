
const express = require('express')
const router = express.Router()
const {
    order_get_all,
    order_get_order,
    order_post_order,
    order_put_order,
    order_delete_all

} = require('../controllers/order')

//order 불러오기

router.get('/', order_get_all)
router.get('/:productID', order_get_order)

//order 등록하기

router.post('/', order_post_order)

//order 업데이트하기

router.put('/:productID', order_put_order)

//order 삭제하기

router.delete('/:productID', order_delete_all)


module.exports = router