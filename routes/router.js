var express = require('express');
var router = express.Router();
 
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