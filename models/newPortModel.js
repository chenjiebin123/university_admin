const { query } = require('express');
const db = require('../db/index')

class newPortModel {
    // 数据库----查询所有数据
    list() {
        return new Promise((resolve, reject) => {
            db.query("select * from newport_table LIMIT 10", (err, results) => {
                if (err) {
                    reject({ status: 1, data: null, error: err });
                    return;
                }
                // console.log(results);
                resolve({ status: 0, data: results, error: null })
            })
        })
    }
    // 数据库----插入数据
    store(obj) {
        return new Promise((resolve, reject) => {
            let {title, content, writer, time, image } = obj;
            console.log("11111===>>>");
            db.query("INSERT INTO newport_table set ?", {  title, content, writer, time, image }, (err, results) => {
                if (err) {
                    // reject({ status: 1, message: err.message, time: 3 })
                    resolve({ status: 1, message: '添加新闻失败！', time: 3 })
                    return;
                }
                if (results.affectedRows !== 1) {
                    resolve({ status: 1, message: '添加新闻失败！', time: 3 })
                    return;
                }
                resolve({ status: 0, message: '添加新闻成功！', time: 3 })
            })
        })
    }
    edit(obj) {
        let id = obj;
        return new Promise((resolve, reject) => {
            db.query("select * from newport_table where id=?", [id], (err, results) => {
                if (err) {
                    reject({ status: 1, data: null, error: err });
                    return;
                }
                // console.log(results);
                resolve({ status: 0, data: results, error: null })
            })
        })
    }
    // 数据库----搜索某一条数据
    search(obj) {
        return new Promise((resolve, reject) => {
            let { name } = obj;
            db.query("select * from newport_table where title like ?", ["%" + name + "%"], (err, results) => {
                // 执行数据库语句错误
                console.log(results);
                if (err) {
                    // console.log('数据库返回数据111');
                    reject({ status: 0, message: err.message, time: 3 })
                    return;
                }
                else {
                    // console.log('数据库返回数据2222');
                    resolve({ status: 0, data: results, error: null })
                    return;
                }
            })
        })
    }
    // 数据库----修改数据
    updata(obj) {
        return new Promise((resolve, reject) => {
            let { id, title, content, writer, time, image } = obj;
            console.log("11111===>>>");
            db.query("update newport_table set ? where id=?", [{ id, title, content, writer, time, image }, id], (err, results) => {
                if (err) {
                    // reject({ status: 1, message: err.message, time: 3 })
                    resolve({ status: 1, message: '新闻id不存在', time: 3 })
                    return;
                }
                if (results.affectedRows !== 1) {
                    resolve({ status: 1, message: '修改新闻失败！', time: 3 })
                    return;
                }
                resolve({ status: 0, message: '修改新闻成功！', time: 3 })
            })
        })
    }
    // 数据库----删除数据
    delete(obj) {
        let id = obj;
        // console.log(id,"id");
        // return ;
        return new Promise((resolve, reject) => {
            db.query(`delete from newport_table where id =?`, [id], (err, results) => {
                if (err) {
                    // console.log("id下有数据");
                    resolve({ status: 1, message: '删除新闻失败！', time: 3 })
                    return;
                }
                if (results.affectedRows !== 1) {
                    resolve({ status: 1, message: '删除新闻失败！', time: 3 })
                    return;
                }
                resolve({ status: 0, message: '删除新闻成功！', time: 3 })
            })
        })
    }
    delete_more(obj) {
        let ids = "(" + obj + ")";
        // console.log(ids,"ids");
        // return ;
        return new Promise((resolve, reject) => {
            db.query(`delete from newport_table where id in ${ids}`, (err, results) => {
                if (err) {
                    // console.log(1,err);
                    resolve({ status: 1, message: '删除新闻失败！', time: 3 })
                    return;
                }
                // console.log(2);
                resolve({ status: 0, message: '批量删除成功！', time: 3 })
            })
        })
    }
}

module.exports = newPortModel;
/*
    select * from major,zj,mjor where university.id = zj.u_id and mjor.id=zj.m_id and university.id = 1
*/ 