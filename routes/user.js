
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const userModel = require('../models/user')



// 회원가입
router.post('/register', (req, res) => {


    // email check -> password 암호화 -> model/user db저장

    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.json({
                    message: 'email already exists'
                })
            }

            else {

                bcrypt.hash(req.body.password, 10, (err, hash) => {

                    if(err) {
                        return res.json({
                            error: err.message
                        })
                    }

                    else{

                        const newUser = new userModel({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        })

                        newUser
                            .save()
                            .then(user => {
                                res.json({
                                    message: 'completly joined',
                                    userInfo: user
                                })
                            })
                            .catch(err => {
                                res.json({
                                    message: err.message
                                })
                            })

                    }
                })

            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })





})



// 로그인
router.post('/login',(req, res) => {

})


module.exports = router