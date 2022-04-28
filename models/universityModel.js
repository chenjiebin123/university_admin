const { query } = require('express');
const db = require('../db/index')

class universityModel {
    // 数据库----查询所有数据
    list() {
        return new Promise((resolve, reject) => {
            db.query("select * from university_detail_table  LIMIT 10", (err, results) => {
                if (err) {
                    reject({ status: 1, data: null, error: err });
                    return;
                }
                console.log(results);
                resolve({ status: 0, data: results, error: null })
            })
        })
    }
    // 数据库----插入数据
    store(obj) {
        return new Promise((resolve, reject) => {
            let {name,code,province,type,nature,ranking,is985,is211 ,isDoubleTop,briefIntroduction,area,teachersNum,studentsNum,studentTeacherRate,createTime,employedRate,furtherStudyRate,advancedMajorNum,masterMajorNum,doctorMajorNum,phone,address,badge,homePage,schoolScenery} = obj;
            // 查询数据库是否存在相同的数据
            console.log('======>>>0000');
            db.query("select * from university_detail_table where name=? or code=? or homePage=? or phone=?", [name, code, homePage, phone], (err, results) => {
                if (err) {
                    reject({ status: 1, message: err.message, time: 3 })
                    return;
                }
                if (results.length != 0) {
                    let str = ""
                    for (let i = 0; i < results.length; i++) {
                        if (results[i].name === name) {
                            str += "学校名称被占用，"
                        }
                        if (results[i].code === code) {
                            str += "学校代码被占用，"
                        }
                        if (results[i].phone === phone) {
                            str += "学校联系电话被占用，"
                        }
                        if (results[i].homePage === homePage) {
                            str += "学校官网网址被占用，"
                        }
                    }
                    resolve({ status: 1, message: `${str}请更换后重试`, time: 3 })
                    return;
                }
                // 数据没有重复，执行添加操作
                db.query("INSERT INTO university_detail_table set ?", {name,code,province,type,nature,ranking,is985,is211 ,isDoubleTop,briefIntroduction,area,teachersNum,studentsNum,studentTeacherRate,createTime,employedRate,furtherStudyRate,advancedMajorNum,masterMajorNum,doctorMajorNum,phone,address,badge,homePage,schoolScenery}, (err, results) => {

                    // return;
                    if (err) {
                        // reject({ status: 1, message: err.message, time: 3 })
                        resolve({ status: 1, message: '添加错误', time: 3 })
                        return;
                    }
                    if (results.affectedRows !== 1) {
                        resolve({ status: 1, message: '新增学校失败！', time: 3 })
                        return;
                    }
                    resolve({ status: 0, message: '新增学校成功', time: 3 })
                })
            })
        })
    }
    edit(obj) {
        let id = obj;
        return new Promise((resolve, reject) => {
            db.query("select * from university_detail_table where id=?", [id], (err, results) => {
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
            db.query("select * from university_detail_table where name like ?", ["%" + name + "%"], (err, results) => {
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
            let { id, name,code,province,type,nature,ranking,is985,is211 ,isDoubleTop,briefIntroduction,area,teachersNum,studentsNum,studentTeacherRate,createTime,employedRate,furtherStudyRate,advancedMajorNum,masterMajorNum,doctorMajorNum,phone,address,badge,homePage,schoolScenery} = obj;
            // 查询数据库是否存在相同的数据
            console.log('======>>>0000');
            db.query("select * from university_detail_table where name=? or code=? or homePage=? or phone=?", [name, code, homePage, phone], (err, results) => {
                if (err) {
                    reject({ status: 1, message: err.message, time: 3 })
                    return;
                }
                if (results.length != 0) {
                    let str = ""
                    for (let i = 0; i < results.length; i++) {
                        if (results[i].name === name) {
                            str += "学校名称被占用，"
                        }
                        if (results[i].code === code) {
                            str += "学校代码被占用，"
                        }
                        if (results[i].phone === phone) {
                            str += "学校联系电话被占用，"
                        }
                        if (results[i].homePage === homePage) {
                            str += "学校官网网址被占用，"
                        }
                    }
                    resolve({ status: 1, message: `${str}请更换后重试`, time: 3 })
                    return;
                }
                // console.log(obj,"updata");
                // 修改数据
                db.query("update university_detail_table set ? where id=?", [{ id, name,code,province,type,nature,ranking,is985,is211 ,isDoubleTop,briefIntroduction,area,teachersNum,studentsNum,studentTeacherRate,createTime,employedRate,furtherStudyRate,advancedMajorNum,masterMajorNum,doctorMajorNum,phone,address,badge,homePage,schoolScenery}, id], (err, results) => {
                    if (err) {
                        console.log('======>111');
                        // reject({ status: 1, message: err.message, time: 3 })
                        resolve({ status: 1, message: err, time: 3 })
                        return;
                    }
                    if (results.affectedRows !== 1) {
                        console.log('======>222');
                        resolve({ status: 1, message: '修改学校信息失败！', time: 3 })
                        return;
                    }
                    console.log('======>333');
                    resolve({ status: 0, message: '修改学校信息成功！', time: 3 })
                })
            })
        })
    }
    // 数据库----删除数据
    delete(obj) {
        let id = obj;
        // console.log(id,"id");
        // return ;
        new Promise((resolve, reject) => {
            db.query(`delete from university_detail_table where id =?`, [id], (err, results) => {
                if (err) {
                    reject({ status: 1, message: err.message, time: 3 })
                    return;
                }
                if (results.affectedRows !== 1) {
                    resolve({ status: 1, message: '删除学校信息失败！', time: 3 })
                    return;
                }
                resolve({ status: 0, message: '删除学校信息成功！', time: 3 })
            })
        })
    }
    delete_more(obj) {
        let ids = "(" + obj + ")";
        console.log(ids, "ids");
        // return ;
        return new Promise((resolve, reject) => {
            db.query(`delete from university_detail_table where id in ${ids}`, (err, results) => {
                if (err) {
                    console.log(1, err);
                    reject({ status: 1, message: err.message, time: 3 })
                    return;
                }
                console.log(2);
                resolve({ status: 0, message: '批量删除成功！', time: 3 })
            })
        })
    }
}

module.exports = universityModel;
/*
    select * from major,zj,mjor where university.id = zj.u_id and mjor.id=zj.m_id and university.id = 1
*/ 