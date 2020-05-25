var express = require('express');
var router = express.Router();

const app = express()

//设置跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  // res.header("Access-Control-Allow-Credentials",true);//携带cookie跨域请求
  req.method.toUpperCase() === "OPTIONS" ? res.sendStatus(200) : next();//防止在预请求阶段就响应接口
});

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var userRouter = require('../view/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'yang' });
});

router.post('/user', (req, res, next) => {
    userRouter.goodAll(req, res, next);
  })
module.exports = router;