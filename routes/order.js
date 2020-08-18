
const express = require('express')
const router = express.Router()

//order 불러오기

router.get('/', (req, res) => {
    res.json({
        message: 'order 불러오기'
    })
})


//order 등록하기

router.post('/', (req, res) => {
    res.json({
        message: 'order 등록하기'
    })
})


//order 업데이트하기

router.put('/', (req, res) => {
    res.json({
        message: 'order 업데이트하기'
    })
})


//order 삭제하기

router.delete('/', (req, res) => {
    res.json({
        message: 'order 삭제하기'
    })
})



module.exports = router