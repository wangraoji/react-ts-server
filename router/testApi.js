let express = require('express');
let router = express.Router();
let _ = require("lodash");
let tableDB = require('../dataBase/tableDB');

// 获取数据总长度=> 说白了获取数据的length做分页
// let tableCount;
// tableDB.count({}, (err, count) => {
//     tableCount = count;
// })


// 新增数据
router.post('/add', (req, res) => {
    let param = req.body;
    let newRow = new tableDB(param);
    let resData = {};
    tableDB.countDocuments({}, (err, count) => {
        if (count < 21) {
            newRow.save().then((result, err) => {
                if (err) {
                    resData.isOk = false;
                    resData.msg = "保存失败！"
                } else {
                    resData.isOk = true;
                    resData.msg = "保存成功！"
                }
                res.json(resData)
            })
        } else {
            resData.isOk = false;
            resData.msg = "数据库容量有限，仅提供20条玩耍";
            res.json(resData)
        }
    })
})

// 删除数据
router.post('/delete', (req, res) => {
    let param = req.body;
    let resData = {};
    tableDB.findByIdAndRemove(param._id).then(() => {
        resData.isOk = true;
        resData.msg = "删除成功";
        res.json(resData);
    })
})


// 修改数据
router.post('/edit', (req, res) => {
    let param = req.body;
    let resData = {};
    tableDB.findByIdAndUpdate(param._id, { $set: param }).then(() => {
        resData.isOk = true;
        resData.msg = "修改成功";
        res.json(resData);
    })
})

// 获取数据+查询
router.post('/getData', (req, res) => {
    let param = req.body;
    // -1 是因为是因为需要跳过，看下面注释！！！
    let page = param.page - 1;
    let pageSize = param.pageSize;
    let reg = new RegExp(param.v, "i");
    // 单字段
    // let obj = { name: { $regex: reg } };
    // 多字段
    let obj = {
        $or: [
            { name: { $regex: reg } },
            { age: { $regex: reg } },
            { address: { $regex: reg } }
        ]
    };
    // 更多查询：https://www.cnblogs.com/coolslider/p/7832083.html
    tableDB.countDocuments(obj, (err, count) => {
        // 显示n-m之间的数据 skip:跳过n条 limit 显示m-n条
        // 传进来1-10  1-1=0 也就是0 10 表示跳过0条，显示10条。
        // 如果是1 就是 跳过10条，显示10条！
        tableDB.find(obj)
            .skip(page * pageSize)
            .limit(pageSize)
            .sort({ '_id': 1 })
            .then((result) => {
                res.json({
                    isOk: true,
                    msg: "查询成功",
                    data: result,
                    total: count,
                    page: page + 1,
                    pageSize: pageSize
                })
            })
    });
})


module.exports = router;