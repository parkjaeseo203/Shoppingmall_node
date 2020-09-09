



const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.user_login = (req, res) => {

    const {email, password} = req.body

    // email유무 체크 -> 패스워드 매칭 -> 토큰 발행
    userModel
        .findOne({email})
        .then(user => {
            if (!user) {
                return res.json({
                    message: 'No email'
                })
            }
            else {
                bcrypt.compare(password, user.password, (err, result) => {

                    if (err || result === false) {
                        return res.json({
                            message: 'wrong password'
                        })
                    }

                    else {
                        // res.json({
                        //     message: 'WELCOME'
                        // })
                        const token = jwt.sign(
                            {
                                email: user.email,
                                id: user._id
                            },
                            'key',
                            { expiresIn: '1d'}
                        )
                        res.json({
                            message: 'auth successful',
                            token: token
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

};

exports.user_register = (req, res) => {

    const {email, name, password} = req.body

    // email check -> password 암호화 -> model/user db저장

    userModel
        .findOne({email})
        .then(user => {
            if (user) {
                return res.json({
                    message: 'email already exists'
                })
            }

            else {

                bcrypt.hash(password, 10, (err, hash) => {

                    if(err) {
                        return res.json({
                            error: err.message
                        })
                    }

                    else{

                        const newUser = new userModel({
                            name,
                            email,
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





};