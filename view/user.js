var $sql = require("./usersql.js");
//使用连接池及数据库配置
var pool = require("../conf/db.js");

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: "1",
      msg: "操作失败",
    });
  } else {
    res.json({
      code: "0",
      msg: "操作成功",
      data: ret,
    });
  }
};
module.exports = {
  // 查全部
  goodAll: function (req, res, next) {
    const body = req.body;
    // console.log(res);
    
    pool.getConnection(function (err, connection) {
      connection.query($sql.getUserById, body.name, function (err, result) {
       // 关闭数据库连接
       connection.release();
        if (result[0] == undefined) {
        return jsonWrite(res, {msg:'此用户不存在'});
        }
        if (result[0].password != body.pass) {
            return jsonWrite(res, {msg:'密码错误'});
        }
        if (result[0].password == body.pass && result[0].name == body.name) {
        const data = {
            token: "jkndfkjsai23894owasufhsef80we",
            user: result[0].name
        };
        return jsonWrite(res, data);
        }
       
        
      });
    });
  },
  // 条件查询
  userById: function (req, res, next) {
    var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
    pool.getConnection(function (err, connection) {
      connection.query($sql.getUserById, id, function (err, result) {
        jsonWrite(res, result);
        connection.release();
      });
    });
  },
  //增加
  useradd: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      // 获取前台页面传过来的参数
      var param = req.query || req.params;

      // 建立连接，向表中插入值
      // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
      connection.query(
        $sql.userinsert,
        [param.name, param.desc, param.price, param.sum],
        function (err, result) {
          if (result) {
            result = {
              code: 200,
              msg: "增加成功",
            };
          }

          // 以json形式，把操作结果返回给前台页面
          jsonWrite(res, result);

          // 释放连接
          connection.release();
        }
      );
    });
  },
  userdelete: function (req, res, next) {
    // delete by Id
    pool.getConnection(function (err, connection) {
      var id = +req.query.id;
      connection.query($sql.userdelete, id, function (err, result) {
        if (result.affectedRows > 0) {
          result = {
            code: 200,
            msg: "删除成功",
          };
        } else {
          result = void 0;
        }
        jsonWrite(res, result);
        connection.release();
      });
    });
  },
  // 修改
  userupdate: function (req, res, next) {
    // update by id
    // 为了简单，要求同时传name和age两个参数
    pool.getConnection(function (err, connection) {
      // 获取前台页面传过来的参数
      var param = req.query || req.params;

      // 建立连接，向表中插入值
      // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
      connection.query(
        $sql.userupdate,
        [param.name, param.desc, param.price, param.sum, param.id],
        function (err, result) {
          if (result) {
            result = {
              code: 200,
              msg: "修改成功",
            };
          }

          // 以json形式，把操作结果返回给前台页面
          jsonWrite(res, result);

          // 释放连接
          connection.release();
        }
      );
    });
  },
};
