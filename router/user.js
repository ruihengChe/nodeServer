const express = require('express');

const router = express.Router();

const userController = require('../controller/userController');


router.post('/register', userController.registerController)

router.post('/login', (req, res) => {
    body = req.body;
    res.send({
        code: 0, // 判断接口请求成功与否。1：失败，0：成功
        message: '登录成功',
        data: body
    })
})

module.exports = router;