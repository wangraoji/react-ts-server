let express = require('express');
let app = express();

let bodyParser = require('body-parser');

let testApi = require('./router/testApi');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,X-Token");

 
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    // res.header("X-Powered-By",' 3.2.1')  
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/testApi', testApi); 

let server = app.listen(3001, function() {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});