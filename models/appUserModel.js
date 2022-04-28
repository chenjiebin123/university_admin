const { query } = require('express');
const db = require('../db/index')
const bcrypt = require('bcryptjs') //加密密码依赖包

class appUserModel {
    // 数据库----查询所有数据
    list() {
        return new Promise((resolve, reject) => {
            db.query("select * from user_table", (err, results) => {
                if (err) {
                    reject({ status: 1, data: null, error: err });
                    return;
                }
                resolve({ status: 0, data: results, error: null })
            })
        })
    }

    // 数据库----搜索某一条数据
    search(obj) {
        return new Promise((resolve, reject) => {
            let { username } = obj;
            db.query("select * from user_table where userName like ?", ["%" + username + "%"], (err, results) => {
                // 执行数据库语句错误
                console.log(results);
                if (err) {
                    console.log('数据库返回数据111');
                    reject({ status: 0, message: err.message, time: 3 })
                    return;
                }
                else {
                    console.log('数据库返回数据2222');
                    resolve({ status: 0, data: results, error: null })
                    return;
                }
            })
        })
    }

    // 数据库----删除数据
    delete(obj) {
        let id = obj;
        console.log(id,"id");
        // return ;
        new Promise((resolve,reject)=>{
            db.query(`delete from user_table where id =?`,[id], (err, results) => {
                if (err) {
                    reject({ status: 1, message: err.message, time: 3 })
                    return;
                }
                if (results.affectedRows !== 1) {
                    resolve({ status: 1, message: '删除用户失败！', time: 3 })
                    return;
                }
                resolve({ status: 0, message: '删除用户成功！', time: 3 })
            })
        })
    }
    delete_more(obj) {
        let ids = "(" + obj + ")";
        console.log(ids,"ids");
        // return ;
        return new Promise((resolve,reject)=>{
            db.query(`delete from user_table where id in ${ids}`, (err, results) => {
                if (err) {
                    console.log(1,err);
                    reject({ status: 1, message: err.message, time: 3 })
                    return;
                }
                console.log(2);
                resolve({ status: 0, message: '批量删除成功！', time: 3 })
            })
        })
    }
}

module.exports = appUserModel;