

// 1
const express = require("express")
const router = express.Router();

// product 불러오기

router.get('/total', (req, res) => {
    res.json({
        message: 'product 불러오기'
    })
})

// product 등록하기

router.post('/', (req, res) => {
    res.json({
        message: 'product 등록하기'
    })
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