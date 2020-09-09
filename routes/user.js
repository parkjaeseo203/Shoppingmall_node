
const express = require('express')
const router = express.Router()


const {
    user_login,
    user_register

} = require('../controllers/user')


// 회원가입
router.post('/register', user_register)

// 로그인
router.post('/login', user_login)


module.exports = router