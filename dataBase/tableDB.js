const mongoose = require('mongoose');
/*
mongodb:// 协议
账号:密码
IP:端口
/表名
?authSource=admin 参数表示用户账号密码登陆

4.0以上必须带useNewUrlParser useUnifiedTopology两个参数
*/
mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/mydb?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('连接失败');
    } else {
        console.log("连接成功")
    }
})
const Schema = mongoose.Schema;
const tableDB = mongoose.model('tabledata', new Schema, 'tabledata');

module.exports = tableDB;