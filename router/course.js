const express = require('express');

const router = express.Router();
// 课程查询
router.get('/find', (req, res) => {
    // res.header('Access-Control-Allow-Origin', '*')
    query = req.query;
    res.send({
        code: 0,
        data: query
    })
})

module.exports = router;