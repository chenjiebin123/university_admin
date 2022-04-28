const { query } = require('express');
const db = require('../db/index')

class majorModel {
    // 数据库----查询所有数据
    list() {
        return new Promise((resolve, reject) => {
            db.query("select * from major_detail_table limit 10", (err, results) => {
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
            let { majorName, subject, majorType, majorCode, level, schoolYear, degree, similarMajor, summary, educationGoal, educationRequire, famousScholar, mainCourse, courseRequire, knowledgeAbility, boyGirlRate, wenLikeRate, graduateNum, avgSalary, jobRankingOfAll, jobRankingOfSubject, lastYearEmployedRate, maxRequireCity, maxRequireIndustry } = obj;
            // 查询数据库是否存在相同的数据
            db.query("select * from major_detail_table where majorName=? or majorCode=?", [majorName, majorCode], (err, results) => {
                if (err) {
                    reject({ status: 1, message: err.message, time: 3 })
                    return;
                }

                if (results.length === 2) {
                    resolve({ status: 1, message: "专业名称与专业代码被占用，请更换后重试！", time: 3 })
                    return;
                }
                if (results.length === 1 && results[0].majorName === majorName && results[0].majorCode === majorCode) {
                    resolve({ status: 1, message: "专业名称与专业代码被占用，请更换后重试！", time: 3 })
                    return;
                }
                if (results.length === 1 && results[0].majorName === majorName) {
                    resolve({ status: 1, message: "专业名称被占用，请更换后重试", time: 3 })
                    return;
                }
                if (results.length === 1 && results[0].majorCode === majorCode) {
                    resolve({ status: 1, message: "专业代码被占用，请更换后重试", time: 3 })
                    return;
                }
                db.query("INSERT INTO major_detail_table set ?", { majorName, subject, majorType, majorCode, level, schoolYear, degree, similarMajor, summary, educationGoal, educationRequire, famousScholar, mainCourse, courseRequire, knowledgeAbility, boyGirlRate, wenLikeRate, graduateNum, avgSalary, jobRankingOfAll, jobRankingOfSubject, lastYearEmployedRate, maxRequireCity, maxRequireIndustry }, (err, results) => {

                    // return;
                    if (err) {
                        // reject({ status: 1, message: err.message, time: 3 })
                        resolve({ status: 1, message: '添加错误', time: 3 })
                        return;
                    }
                    if (results.affectedRows !== 1) {
                        resolve({ status: 1, message: '新增专业失败！', time: 3 })
                        return;
                    }
                    resolve({ status: 0, message: '新增专业成功', time: 3 })
                })

            })



        })
    }
    edit(obj) {
        let id = obj;
        return new Promise((resolve, reject) => {
            db.query("select * from major_detail_table where id=?", [id], (err, results) => {
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
            db.query("select * from major_detail_table  where majorName like ? limit 10", ["%" + name + "%"], (err, results) => {
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
            let { id, majorName, subject, majorType, majorCode, level, schoolYear, degree, similarMajor, summary, educationGoal, educationRequire, famousScholar, mainCourse, courseRequire, knowledgeAbility, boyGirlRate, wenLikeRate, graduateNum, avgSalary, jobRankingOfAll, jobRankingOfSubject, lastYearEmployedRate, maxRequireCity, maxRequireIndustry } = obj;
            // 查询数据库是否存在相同的数据
            db.query("select * from major_detail_table where majorName=? or majorCode=?", [majorName, majorCode], (err, results) => {
                if (err) {
                    reject({ status: 1, message: err.message, time: 3 })
                    return;
                }

                if (results.length === 2) {
                    resolve({ status: 1, message: "专业名称与专业代码被占用，请更换后重试！", time: 3 })
                    return;
                }
                if (results.length === 1 && results[0].majorName === majorName && results[0].majorCode === majorCode) {
                    resolve({ status: 1, message: "专业名称与专业代码被占用，请更换后重试！", time: 3 })
                    return;
                }
                if (results.length === 1 && results[0].majorName === majorName) {
                    resolve({ status: 1, message: "专业名称被占用，请更换后重试", time: 3 })
                    return;
                }
                if (results.length === 1 && results[0].majorCode === majorCode) {
                    resolve({ status: 1, message: "专业代码被占用，请更换后重试", time: 3 })
                    return;
                }
                console.log("updata");
                // 修改数据
                db.query("update major_detail_table set ? where id=?", [{ id, majorName, subject, majorType, majorCode, level, schoolYear, degree, similarMajor, summary, educationGoal, educationRequire, famousScholar, mainCourse, courseRequire, knowledgeAbility, boyGirlRate, wenLikeRate, graduateNum, avgSalary, jobRankingOfAll, jobRankingOfSubject, lastYearEmployedRate, maxRequireCity, maxRequireIndustry }, id], (err, results) => {
                    if (err) {
                        // reject({ status: 1, message: err.message, time: 3 })
                        resolve({ status: 1, message: '专业分类id不存在', time: 3 })
                        return;
                    }
                    if (results.affectedRows !== 1) {
                        resolve({ status: 1, message: '修改专业失败！', time: 3 })
                        return;
                    }
                    resolve({ status: 0, message: '修改专业成功！', time: 3 })
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
            db.query(`delete from major_detail_table where id =?`, [id], (err, results) => {
                if (err) {
                    reject({ status: 1, message: err.message, time: 3 })
                    return;
                }
                if (results.affectedRows !== 1) {
                    resolve({ status: 1, message: '删除专业分类失败！', time: 3 })
                    return;
                }
                resolve({ status: 0, message: '删除专业分类成功！', time: 3 })
            })
        })
    }
    delete_more(obj) {
        let ids = "(" + obj + ")";
        console.log(ids, "ids");
        // return ;
        return new Promise((resolve, reject) => {
            db.query(`delete from major_detail_table where id in ${ids}`, (err, results) => {
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

module.exports = majorModel;
/*
    select * from major,zj,mjor where university.id = zj.u_id and mjor.id=zj.m_id and university.id = 1
*/ 