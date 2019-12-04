let express = require('express');
let router = express.Router();
let _ = require("lodash");
let tableDB = require('../dataBase/tableDB');

// 获取测试数据
router.get('/data', (req, res) => {
    tableDB.find().then((result) => {
        res.json(result)
    });
});

module.exports = router;