const db = require('../db/index')
const bcrypt = require('bcryptjs') //加密密码依赖包

// 生成 Token 字符串


class userModel {
    register(obj) {

        return new Promise((resolve, reject) => {

            let { username, password, phone } = obj;
            db.query(`select * from admin_table where username=?`, [username], (err, results) => {
                // 执行 SQL 语句失败
                if (err) {
                    console.log("1   --->    执行 SQL 语句失败");
                    reject({ status: 1, message: err.message, time: 3 })
                }
                // 用户名被占用
                if (results.length > 0) {
                    console.log("用户名被占用");
                    resolve({ status: 1, message: '用户名被占用,请更换其他用户名!', time: 3 })
                }
                //   用户名可用，继续后续流程...
                db.query('insert into admin_table set ?', { username, password, phone },
                    (err, results) => {
                        // 执行 SQL 语句失败
                        if (err) {
                            console.log("2   --->    执行 SQL 语句失败");
                            reject({ status: 1, message: err.message, time: 3 })


                        }
                        // SQL 语句执行成功，但影响行数不为 1
                        if (results.affectedRows !== 1) {
                            console.log("SQL 语句执行成功，但影响行数不为 1");
                            resolve({ status: 1, message: '注册用户失败,请稍后再试!' , time: 3 })
                        }
                        // 注册成功
                        console.log('注册成功');
                        resolve({ status: 0, message: '注册成功!', time: 3 })
                    })
            })


        })

    }

    checkLogin(obj) {
        return new Promise((resolve,reject)=>{

            let { username, password } = obj;
            console.log(obj);
            db.query(`select * from admin_table where username=?`,username,(err,results)=>{
                if (err) {
                    console.log("1   --->    执行 SQL 语句失败");
                    reject({ status: 1, message: err.message, time: 3 })
                }
                if (results.length !== 1) {
                    console.log("1   --->    执行 SQL 语句成功，登录失败");
                    resolve({ status: 1, message: '登录失败!', time: 3 })
                }
                const compareResult = bcrypt.compareSync(password, results[0].password);
                if (!compareResult) {
                    console.log("1   --->    执行 SQL 语句成功，密码错误");
                    resolve({ status: 1, message: '登录失败!', time: 3 })
                }
                else{
                    console.log("登录成功");
                    resolve({ status: 0, message: '登录成功!', time: 3 })
                }
            })
        })
    }
}

module.exports = userModel;