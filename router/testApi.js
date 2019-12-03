let express = require('express');
var fs = require("fs");
let router = express.Router();
let _ = require("lodash");


let cont;
fs.readFile("data/testData.json", (a, b) => {
    if (a) {
        console.log(a);
    } else {
        cont = JSON.parse(b.toString());
    }
})

// 获取测试数据
router.get('/data', (req, res) => {
    res.json(cont);
});

module.exports = router;