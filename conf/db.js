// conf/db.js
// MySQL数据库联接配置及连接池
var mysql=require('mysql');
var mysqldb = {
    host: 'localhost', 
    user: 'root',
    password: '123456',
    database:'yang', // 前面建的user表位于些数据库中
    port: 3306
}

function extend(target, source, flag) {

    
    for(var key in source) {
        if(source.hasOwnProperty(key))
            flag ?
                (target[key] = source[key]) :
                (target[key] === void 0 && (target[key] = source[key]));
    }
    return target;
}
var pool  = mysql.createPool(extend({}, mysqldb));
pool.getConnection((err) =>{
    if (err) {
        console.log('数据库连接失败');
        console.log(err);
        return
    }
    return console.log('数据库连接成功');
    
})
module.exports = pool;

