const md5 = require('md5');
const db = require('../../db/index')
const bcrypt = require('bcryptjs') //加密密码依赖包
// const UserModel = require('../models/userModel');


// const userModel = new UserModel();


class appController {

    constructor(req, res) {
        // 把 req 和 res 定义为对象的属性
        this.req = req;
        this.res = res;
    }
    async getNewprot(req, res) {
        console.log(req.query.size);
        // return ;
        let i = req.query.size;
        db.query(`select * from newport_table LIMIT ${i}`, (err, results) => {
            // console.log(results);
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    size: req.query.size,
                    data: results
                }
            });
        })
    }
    async getNewprotDetail(req, res) {
        console.log(req.query.title);
        // return ;
        let title = req.query.title;
        db.query(`SELECT * from newport_table where title = ?`, [title], (err, results) => {
            // console.log(results);
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    size: title,
                    data: results
                }
            });
        })
    }
    async getUniversityList(req, res) {
        console.log(req.query.size);
        // return ;
        let i = req.query.size;
        db.query(`select * from university_list_table LIMIT ${i}`, (err, results) => {
            // console.log(results);
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    size: req.query.size,
                    data: results
                }
            });
        })
    }
    async getUniversityDetail(req, res) {
        console.log(req.query.name);
        // return ;
        let name = req.query.name;
        db.query(`SELECT * from university_detail_table where name = ?`, [name], (err, results) => {
            // console.log(results);
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    size: name,
                    data: results
                }
            });
        })
    }
    async searchUniversity(req, res) {
        // console.log(req.body.name);
        let name = req.body.name;
        console.log(name);
        db.query("select * from university_list_table where name like ?", ["%" + name + "%"], (err, results) => {
            console.log(results);
            // return ;
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    name: name,
                    data: results
                }
            });
        })
    }
    async selectUniversity(req, res) {
        // console.log(req.body.name);
        let data = req.body;
        console.log(data);
        let { cenci, leixin, diqu, size } = data;
        // console.log({ cenci, leixin, diqu });
        if (cenci == '层次' || cenci == '所有') {
            if (leixin == '所有' || leixin == '类型') {
                if (diqu == '所有' || diqu == '地区') {
                    db.query(`select * from university_list_table LIMIT ${size}`, (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
                else {
                    db.query(`select * from university_list_table where province = ? LIMIT ${size}`, [diqu], (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
            }
            else {
                if (diqu == '所有' || diqu == '地区') {
                    db.query(`select * from university_list_table where type = ? LIMIT ${size}`, [leixin], (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
                else {
                    db.query(`select * from university_list_table where province = ? and type = ? LIMIT ${size}`, [diqu, leixin], (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
            }
        }
        else if (cenci == '985' || cenci == '211' || cenci == '双一流') {
            if (cenci == '985') {
                cenci = 'is985'
            } else if (cenci == '211') {
                cenci = 'is211'
            } else if (cenci == '双一流') {
                cenci = 'isDoubleTop'
            }
            if (leixin == '所有' || leixin == '类型') {
                if (diqu == '所有' || diqu == '地区') {
                    console.log('yes', cenci)
                    db.query(`select * from university_list_table where ${cenci} = 1 LIMIT ${size}`, (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
                else {
                    db.query(`select * from university_list_table where province = ? and ${cenci} = 1 LIMIT ${size}`, [diqu], (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
            }
            else {
                if (diqu == '所有' || diqu == '地区') {
                    db.query(`select * from university_list_table where type = ? and ${cenci} = 1 LIMIT ${size}`, [leixin], (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
                else {
                    db.query(`select * from university_list_table where province = ? and type = ? and ${cenci} = 1 LIMIT ${size}`, [diqu, leixin], (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
            }
        }
        else if (cenci == '公立' || cenci == '民办') {
            if (leixin == '所有' || leixin == '类型') {
                if (diqu == '所有' || diqu == '地区') {
                    console.log('yes', cenci)
                    db.query(`select * from university_list_table where nature = ? LIMIT ${size}`, [cenci], (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
                else {
                    db.query(`select * from university_list_table where province = ? and nature = ? LIMIT ${size}`, [diqu, cenci], (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
            }
            else {
                if (diqu == '所有' || diqu == '地区') {
                    db.query(`select * from university_list_table where type = ? and nature = ? LIMIT ${size}`, [leixin, cenci], (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
                else {
                    db.query(`select * from university_list_table where province = ? and type = ? and nature = ? LIMIT ${size}`, [diqu, leixin, cenci], (err, results) => {
                        // console.log(results);
                        res.json({
                            error_code: 0,
                            reason: 'success',
                            result: {
                                size: req.query.size,
                                data: results
                            }
                        });
                    })
                }
            }
        }
    }
    async majorSelect(req, res) {
        // console.log(req.body.name);
        let name = req.body.name;
        console.log(name);
        return;
        db.query("select * from university_list_table where name like ?", ["%" + name + "%"], (err, results) => {
            console.log(results);
            // return ;
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    name: name,
                    data: results
                }
            });
        })
    }
    async getMajorList(req, res) {
        // console.log(req.query.size);
        // return ;
        let i = req.query.size;
        db.query(`select * from major_list LIMIT ${i}`, (err, results) => {
            // console.log(results);
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    size: req.query.size,
                    data: results
                }
            });
        })
    }
    async getMajorDetail(req, res) {
        // console.log(req.query.size);
        // return ;
        let name = req.query.name;
        db.query(`select * from major_detail_table where majorName = ?`, [name], (err, results) => {
            // console.log(results);
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    size: req.query.size,
                    data: results
                }
            });
        })
    }
    async getsimilarMajorList(req, res) {
        // console.log(req.query.size);
        // return ;
        let name = req.query.name;
        db.query(`select * from major_detail_table where majorType = ?`, [name], (err, results) => {
            // console.log(results);
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    size: req.query.size,
                    data: results
                }
            });
        })
    }
    async searchMajor(req, res) {
        // console.log(req.body.name);
        let name = req.body.name;
        console.log(name);
        db.query("select * from major_list where majorName like ?", ["%" + name + "%"], (err, results) => {
            console.log(results);
            // return ;
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    name: name,
                    data: results
                }
            });
        })
    }
    async selectMajor(req, res) {
        // console.log(req.body.name);
        let data = req.body;
        console.log(data);
        let { cenci, leibie, fenlei, size } = data;
        db.query(`SELECT * from major_detail_table where level = ? and subject = ? and majorType = ? LIMIT ${size}`, [cenci, leibie, fenlei], (err, results) => {
            // console.log(results);
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    size: size,
                    data: results
                }
            });
        })
    }

    async major_cenci(req, res) {
        // console.log(req.body.name);
        let name = req.body.name;
        console.log(name);
        db.query("select DISTINCT level from major_detail_table", (err, results) => {
            console.log(results);
            // return ;
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    name: name,
                    data: results
                }
            });
        })
    }
    async major_leibie(req, res) {
        // console.log(req.body.name);
        let name = req.query.name;
        console.log(name);
        db.query("select DISTINCT subject from major_detail_table where level=?", [name], (err, results) => {
            console.log(results);
            // return ;
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    name: name,
                    data: results
                }
            });
        })
    }
    async major_fenlei(req, res) {
        // console.log(req.body.name);
        let name = req.query.name;
        console.log(name);
        db.query("select DISTINCT majorType from major_detail_table where subject=?", [name], (err, results) => {
            console.log(results);
            // return ;
            res.json({
                error_code: 0,
                reason: 'success',
                result: {
                    name: name,
                    data: results
                }
            });
        })
    }

    async user_login(req, res) {
        let userName = req.body.userName;
        let password = req.body.password;
        // console.log(userName,password)
        // return;
        let password_str = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;
        if (password_str.test(password) == false) {
            console.log("2   --->    密码格式不对");
            res.json({
                error_code: 1,
                status: 300,
                reason: '密码格式不对',
                result: {},
            });
            return;
        }
        // return;
        db.query(`select * from user_table where userName=?`, userName, (err, results) => {
            if (err) {
                console.log("2   --->    执行 SQL 语句失败");
                res.json({
                    error_code: 1,
                    status: 300,
                    reason: '语句失败，登录失败',
                    result: {},
                    err: err
                });
                return;
            }
            if (results.length !== 1) {
                console.log("1   --->    执行 SQL 语句成功，登录失败");
                res.json({
                    error_code: 1,
                    status: 300,
                    reason: '登录失败,账号或密码错误',
                    result: {},
                    err: err
                });
                return;
            }
            const compareResult = bcrypt.compareSync(password, results[0].passWord);
            if (!compareResult) {
                res.json({
                    error_code: 1,
                    status: 300,
                    reason: '登录失败,账号或密码错误',
                    result: {},
                    err: err
                });
                return;
            }
            else {
                let time = new Date();
                let sj = time.getTime();
                res.json({
                    error_code: 0,
                    status: 200,
                    reason: '登陆成功',
                    result: {
                        token: results[0].userName + sj,
                        userName: results[0].userName
                    },

                });
                return;
            }
        })
    }

    async user_register(req, res) {
        // console.log(req.body.name);
        let userName = req.body.userName;
        let password = req.body.password;
        console.log(userName, password, '未加密');

        let phone = req.body.phone;
        console.log(userName, password, phone, '加密');
        // return;
        let phone_str = /^[1][3,5,7,8][0-9]{9}$/;
        let password_str = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;
        if (password_str.test(password) == false) {
            console.log("2   --->    密码格式不对");
            res.json({
                error_code: 1,
                status: 300,
                reason: '密码格式不对',
                result: {},
            });
            return;
        }
        if (phone_str.test(phone) == false) {
            console.log("2   --->    手机格式不对");
            res.json({
                error_code: 1,
                status: 300,
                reason: '手机号码格式不对',
                result: {},
            });
            return;
        }
        password = bcrypt.hashSync(password, 10);
        db.query('select * from user_table where userName = ? or phone = ?', [userName, phone], (err, results) => {
            if (err) {
                console.log("2   --->    执行 SQL 语句失败");
                res.json({
                    error_code: 1,
                    status: 300,
                    reason: '查询失败',
                    result: {},
                    err: err
                });
                return;
            }
            console.log(results);
            // return;
            if (results.length === 2) {
                console.log("用户名和手机号被占用");
                res.json({
                    error_code: 1,
                    status: 300,
                    reason: '用户名和手机号被占用',
                    result: {},
                    err: err
                });
                return;
            }
            if (results.length === 1 && results[0].userName === userName && results[0].phone === phone) {
                console.log("用户名和手机号被占用");
                res.json({
                    error_code: 1,
                    status: 300,
                    reason: '用户名和手机号被占用',
                    result: {},
                    err: err
                });
                return;
            }
            if (results.length === 1 && results[0].userName === userName) {
                console.log("用户名被占用");
                res.json({
                    error_code: 1,
                    status: 300,
                    reason: '用户名被占用',
                    result: {},
                    err: err
                });
                return;
            }
            if (results.length === 1 && results[0].phone === phone) {
                console.log("手机号码被占用");
                res.json({
                    error_code: 1,
                    status: 300,
                    reason: '手机号码被占用',
                    result: {},
                    err: err
                });
                return;
            }
            db.query('insert into user_table set ?', { userName, password, phone }, (err, results) => {
                // 执行 SQL 语句失败
                if (err) {
                    console.log("2   --->    执行 SQL 语句失败");
                    res.json({
                        error_code: 1,
                        status: 300,
                        reason: '注册失败',
                        result: {},
                        err: err
                    });
                    return;
                }

                // SQL 语句执行成功，但影响行数不为 1
                if (results.affectedRows !== 1) {
                    console.log("SQL 语句执行成功，但影响行数不为 1");
                    res.json({
                        error_code: 0,
                        status: 200,
                        reason: 'SQL 语句执行成功，但影响行数不为 1',
                        result: {},
                        success: '注册成功'
                    });
                    return;
                }
                // 注册成功
                console.log('注册成功');
                res.json({
                    error_code: 0,
                    status: 200,
                    reason: '注册成功',
                    result: {
                        data: '成功'
                    },
                    success: '注册成功'
                });
                // resolve({ status: 0, message: '注册成功!', time: 3 })
            })
        })


    }

    async addUniversityLike(req, res) {
        console.log(req.query.userName, req.query.university_name);
        // return ;
        let userName = req.query.userName;
        let university_name = req.query.university_name;
        let university_id;
        let user_id;
        let aaa = new Promise((resolve, reject) => {
            db.query(`select id from university_detail_table where name=?`, [university_name], (err, results) => {
                // console.log(results);
                if (err) {
                    res.json({
                        error_code: 1,
                        reason: '添加失败',
                        result: {},
                        err: err
                    });
                    return;
                } else {
                    university_id = results[0].id;
                    db.query(`select id from user_table where userName=?`, [userName], (err, results) => {
                        // console.log(results);
                        if (err) {
                            console.log('err');
                            res.json({
                                error_code: 1,
                                reason: '添加失败',
                                result: {},
                                err: err
                            });
                            return;
                        } else {
                            console.log('succ');
                            user_id = results[0].id;
                            // return {university_id:res,user_id:user_id}
                            // return user_id
                            // console.log(user_id)
                            resolve({ user_id, university_id, university_name })
                        }
                    })
                    // console.log(university_id,'1')
                }

            })
        })
        aaa.then(
            success => {
                console.log(success, 111);
                // return;
                db.query("INSERT INTO university_like_table set ?", { university_id, user_id, university_name }, (err, results) => {

                    // return;
                    if (err) {
                        res.json({
                            error_code: 1,
                            reason: '收藏成功',
                            result: {},
                            err: err
                        });
                        return;
                    }
                    res.json({
                        error_code: 0,
                        reason: '收藏成功',
                        result: {},
                        err: err
                    });
                    // return;
                })
                return success
            },
            err => {
                console.log(rej, 111);
                return err
            }
        )
        return;

    }
    async addMajorLike(req, res) {
        console.log(req.query.userName, req.query.majorName);
        // return ;
        let userName = req.query.userName;
        let major_name = req.query.majorName;
        let major_id;
        let user_id;
        let aaa = new Promise((resolve, reject) => {
            db.query(`select id from major_detail_table where  majorName=?`, [major_name], (err, results) => {
                // console.log(results);
                if (err) {
                    res.json({
                        error_code: 1,
                        reason: '添加失败',
                        result: {},
                        err: err
                    });
                    return;
                } else {
                    major_id = results[0].id;
                    db.query(`select id from user_table where userName=?`, [userName], (err, results) => {
                        // console.log(results);
                        if (err) {
                            console.log('err');
                            res.json({
                                error_code: 1,
                                reason: '添加失败',
                                result: {},
                                err: err
                            });
                            return;
                        } else {
                            console.log('succ');
                            user_id = results[0].id;
                            resolve({ user_id, major_id, major_name })
                        }
                    })
                }

            })
        })
        aaa.then(
            success => {
                console.log(success, 111);
                // return;
                db.query("INSERT INTO major_like_table set ?", { major_id, user_id, major_name }, (err, results) => {

                    // return;
                    if (err) {
                        res.json({
                            error_code: 1,
                            reason: '收藏成功',
                            result: {},
                            err: err
                        });
                        return;
                    }
                    res.json({
                        error_code: 0,
                        reason: '收藏成功',
                        result: {},
                        err: err
                    });
                    // return;
                })
                return success
            },
            err => {
                console.log(err, 111);
                return err
            }
        )
        return;

    }
    async delectUniversityLike(req, res) {
        console.log(req.query.userName, req.query.university_name);
        // return ;
        let userName = req.query.userName;
        let university_name = req.query.university_name;
        let user_id;
        let aaa = new Promise((resolve, reject) => {
            db.query(`select id from user_table where userName=?`, [userName], (err, results) => {
                // console.log(results);
                if (err) {
                    console.log('err');
                    res.json({
                        error_code: 1,
                        reason: '删除失败',
                        result: {},
                        err: err
                    });
                    return;
                } else {
                    console.log('succ');
                    user_id = results[0].id;
                    // return {university_id:res,user_id:user_id}
                    // return user_id
                    // console.log(user_id)
                    resolve({ user_id, university_name })
                }
            })
        })
        aaa.then(
            success => {
                console.log(success, 111, university_name, user_id);
                // return;
                db.query("delete from university_like_table where university_name = ? and user_id = ?", [university_name, user_id], (err, results) => {

                    // return;
                    if (err) {
                        res.json({
                            error_code: 1,
                            reason: '删除失败',
                            result: {},
                            err: err
                        });
                        return;
                    }
                    console.log(results, '成功');
                    res.json({
                        error_code: 0,
                        reason: '删除成功',
                        result: {},
                        err: err
                    });
                    // return;
                })
                return success
            },
            err => {
                console.log(rej, 111);
                return err
            }
        )
        return;

    }
    async delectMajorLike(req, res) {
        console.log(req.query.userName, req.query.majorName);
        // return ;
        let userName = req.query.userName;
        let major_name = req.query.majorName;
        let user_id;
        let aaa = new Promise((resolve, reject) => {
            db.query(`select id from user_table where userName=?`, [userName], (err, results) => {
                // console.log(results);
                if (err) {
                    console.log('err');
                    res.json({
                        error_code: 1,
                        reason: '删除失败',
                        result: {},
                        err: err
                    });
                    return;
                } else {
                    console.log('succ');
                    user_id = results[0].id;
                    // return {university_id:res,user_id:user_id}
                    // return user_id
                    // console.log(user_id)
                    resolve({ user_id, major_name })
                }
            })
        })
        aaa.then(
            success => {
                console.log(success, 111, major_name, user_id);
                // return;
                db.query("delete from major_like_table where major_name = ? and user_id = ?", [major_name, user_id], (err, results) => {

                    // return;
                    if (err) {
                        res.json({
                            error_code: 1,
                            reason: '删除失败',
                            result: {},
                            err: err
                        });
                        return;
                    }
                    console.log(results, '成功');
                    res.json({
                        error_code: 0,
                        reason: '删除成功',
                        result: {},
                        err: err
                    });
                    // return;
                })
                return success
            },
            err => {
                console.log(rej, 111);
                return err
            }
        )
        return;

    }
    async searchUniversityLike(req, res) {
        console.log(req.query.userName, req.query.university_name);
        // return ;
        let userName = req.query.userName;
        let university_name = req.query.university_name;
        let user_id;
        let aaa = new Promise((resolve, reject) => {
            db.query(`select id from user_table where userName=?`, [userName], (err, results) => {
                // console.log(results);
                if (err) {
                    console.log('err');
                    res.json({
                        error_code: 1,
                        reason: '查询失败',
                        result: {},
                        err: err
                    });
                    return;
                } else {
                    // console.log('succ',results);
                    // return;
                    user_id = results[0].id;
                    // return {university_id:res,user_id:user_id}
                    // return user_id
                    // console.log(user_id)
                    resolve({ user_id, university_name })
                }
            })
        })
        aaa.then(
            success => {
                console.log(success, 111, university_name, user_id);
                // return;
                db.query("select * from university_like_table where university_name = ? and user_id = ?", [university_name, user_id], (err, results) => {

                    // return;
                    if (err) {
                        res.json({
                            error_code: 1,
                            reason: '查询失败',
                            result: {},
                            err: err
                        });
                        return;
                    }
                    console.log(results, '成功');
                    if (results.length >= 1) {
                        res.json({
                            error_code: 0,
                            reason: '已收藏',
                            result: {
                                is_like: true,
                                data: results
                            },
                            err: err
                        });
                    } else {
                        res.json({
                            error_code: 0,
                            reason: '未收藏',
                            result: {
                                is_like: false,
                                data: results
                            },
                            err: err
                        });
                    }
                    // return;
                })
                return success
            },
            err => {
                console.log(rej, 111);
                return err
            }
        )
        return;

    }
    async searchMajorLike(req, res) {
        console.log(req.query.userName, req.query.majorName);
        // return ;
        let userName = req.query.userName;
        let major_name = req.query.majorName;
        let user_id;
        let aaa = new Promise((resolve, reject) => {
            db.query(`select id from user_table where userName=?`, [userName], (err, results) => {
                // console.log(results);
                if (err) {
                    console.log('err');
                    res.json({
                        error_code: 1,
                        reason: '查询失败',
                        result: {},
                        err: err
                    });
                    return;
                } else {
                    // console.log('succ',results);
                    // return;
                    user_id = results[0].id;
                    // return {university_id:res,user_id:user_id}
                    // return user_id
                    // console.log(user_id)
                    resolve({ user_id, major_name })
                }
            })
        })
        aaa.then(
            success => {
                console.log(success, 111, major_name, user_id);
                // return;
                db.query("select * from major_like_table where major_name = ? and user_id = ?", [major_name, user_id], (err, results) => {

                    // return;
                    if (err) {
                        res.json({
                            error_code: 1,
                            reason: '查询失败',
                            result: {},
                            err: err
                        });
                        return;
                    }
                    console.log(results, '成功');
                    if (results.length >= 1) {
                        res.json({
                            error_code: 0,
                            reason: '已收藏',
                            result: {
                                is_like: true,
                                data: results
                            },
                            err: err
                        });
                    } else {
                        res.json({
                            error_code: 0,
                            reason: '未收藏',
                            result: {
                                is_like: false,
                                data: results
                            },
                            err: err
                        });
                    }
                    // return;
                })
                return success
            },
            err => {
                console.log(rej, 111);
                return err
            }
        )
        return;

    }
    async UniversityLikeList(req, res) {
        // console.log(req.query.userName);
        // return ;
        let userName = req.query.userName;
        let user_id;
        let aaa = new Promise((resolve, reject) => {
            db.query(`select id from user_table where userName=?`, [userName], (err, results) => {
                // console.log(results);
                if (err) {
                    console.log('err');
                    res.json({
                        error_code: 1,
                        reason: '查询失败',
                        result: {},
                        err: err
                    });
                    return;
                } else {
                    user_id = results[0].id;
                    resolve({ user_id })
                }
            })
        })
        aaa.then(
            success => {
                console.log(success, 111, user_id);
                // return;
                db.query("select * from university_like_table where  user_id = ?", [user_id], (err, results) => {

                    // return;
                    if (err) {
                        res.json({
                            error_code: 1,
                            reason: '查询失败',
                            result: {},
                            err: err
                        });
                        return;
                    }
                    // console.log(results,'成功');
                    if (results.length >= 1) {
                        let i = 0;
                        let arr = []
                        // console.log(results.length);
                        // return;
                        let time = setInterval(() => {
                            if (i < results.length) {
                                db.query('select * from university_detail_table where name=?', [results[i].university_name], (err1, results1) => {
                                    if (err1) {
                                        res.json({
                                            error_code: 1,
                                            reason: '查询失败',
                                            result: {},
                                            err1: err1
                                        });
                                        return;
                                    }
                                    if (results1.length >= 1) {
                                        arr.push(results1[0])

                                        i++;
                                    }
                                })
                            }
                            else {
                                clearInterval(time)
                                res.json({
                                    error_code: 0,
                                    reason: '查询成功',
                                    result: {
                                        data: arr
                                    }
                                });
                                return;
                            }
                        }, 70);

                        // res.json({
                        //     error_code: 0,
                        //     reason: '查询成功',
                        //     result: {
                        //         data:results
                        //     },
                        //     err: err
                        // });
                        // return;
                    } else {
                        res.json({
                            error_code: 0,
                            reason: '查询失败',
                            result: {
                                data: results
                            },
                            err: err
                        });
                        return;
                    }
                    // return;
                })
                return success
            },
            err => {
                console.log(rej, 111);
                return err
            }
        )
        return;

    }
    async MajorLikeList(req, res) {
        // console.log(req.query.userName);
        // return ;
        let userName = req.query.userName;
        let user_id;
        let aaa = new Promise((resolve, reject) => {
            db.query(`select id from user_table where userName=?`, [userName], (err, results) => {
                // console.log(results);
                if (err) {
                    console.log('err');
                    res.json({
                        error_code: 1,
                        reason: '查询失败',
                        result: {},
                        err: err
                    });
                    return;
                } else {
                    user_id = results[0].id;
                    resolve({ user_id })
                }
            })
        })
        aaa.then(
            success => {
                console.log(success, 111, user_id);
                // return;
                db.query("select * from major_like_table where  user_id = ?", [user_id], (err, results) => {

                    // return;
                    if (err) {
                        res.json({
                            error_code: 1,
                            reason: '查询失败',
                            result: {},
                            err: err
                        });
                        return;
                    }
                    // console.log(results,'成功');
                    if (results.length >= 1) {
                        let i = 0;
                        let arr = []
                        // console.log(results.length);
                        // return;
                        let time = setInterval(() => {
                            if (i < results.length) {
                                db.query('select * from major_detail_table where majorName=?', [results[i].major_name], (err1, results1) => {
                                    if (err1) {
                                        res.json({
                                            error_code: 1,
                                            reason: '查询失败',
                                            result: {},
                                            err1: err1
                                        });
                                        return;
                                    }
                                    if (results1.length >= 1) {
                                        arr.push(results1[0])

                                        i++;
                                    }
                                })
                            }
                            else {
                                clearInterval(time)
                                res.json({
                                    error_code: 0,
                                    reason: '查询成功',
                                    result: {
                                        data: arr
                                    }
                                });
                                return;
                            }
                        }, 70);

                        // res.json({
                        //     error_code: 0,
                        //     reason: '查询成功',
                        //     result: {
                        //         data:results
                        //     },
                        //     err: err
                        // });
                        // return;
                    } else {
                        res.json({
                            error_code: 0,
                            reason: '查询失败',
                            result: {
                                data: results
                            },
                            err: err
                        });
                        return;
                    }
                    // return;
                })
                return success
            },
            err => {
                console.log(rej, 111);
                return err
            }
        )
        return;

    }

    async updata_pw(req, res) {
        // console.log(req.body.name);
        let userName = req.body.userName;
        let old_password = req.body.old_password;
        let new_password = req.body.new_password;
        if (old_password.trim() == "") {
            res.json({
                error_code: 1,
                status: 300,
                reason: '旧密码不能为空',
                result: {},
            });
            return;
        }
        if (new_password.trim() == "") {
            res.json({
                error_code: 1,
                status: 300,
                reason: '旧密码不能为空',
                result: {},
            });
            return;
        }
        console.log(userName, old_password, new_password, '未加密1111');
        // return;
        let password_str = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;
        if (password_str.test(new_password) == false) {
            console.log("2   --->    密码格式不对2222");
            res.json({
                error_code: 1,
                status: 300,
                reason: '新密码格式不对',
                result: {},
            });
            return;
        }
        // old_password = bcrypt.hashSync(old_password, 10);
        new_password = bcrypt.hashSync(new_password, 10);
        db.query('select * from user_table where userName = ?', [userName], (err, results) => {
            if (err) {
                console.log("2   --->    执行 SQL 语句失败333");
                res.json({
                    error_code: 1,
                    status: 300,
                    reason: '修改失败',
                    result: {},
                    err: err
                });
                return;
            }
            // console.log(results);
            // return;
            if (results.length < 0) {
                console.log("用户名不存在44444");
                res.json({
                    error_code: 1,
                    status: 300,
                    reason: '用户名不存在',
                    result: {},
                    err: err
                });
                return;
            }
            const compareResult = bcrypt.compareSync(old_password, results[0].passWord);
            console.log("用户名存在44444====>111", compareResult);
            if (!compareResult) {
                res.json({
                    error_code: 1,
                    status: 300,
                    reason: '密码错误',
                    result: {},
                    err: err
                });
                return;
            } else {
                db.query('update user_table set passWord=? where userName=? and passWord=?', [new_password, userName, results[0].passWord], (err, results) => {
                    // 执行 SQL 语句失败
                    if (err) {
                        console.log("2   --->    执行 SQL 语句失败55555");
                        res.json({
                            error_code: 1,
                            status: 300,
                            reason: '执行错误',
                            result: {},
                            err: err
                        });
                        return;
                    }
                    res.json({
                        error_code: 0,
                        status: 200,
                        reason: '修改成功',
                        result: {
                            data: '成功',
                        },
                    });
                    // if (results.length < 1) {
                    //     console.log('修改失败6666===》>');
                    // }
                    // // 注册成功
                    // if (results.length >= 1) {
                    //     console.log('修改成功6666');
                    //     res.json({
                    //         error_code: 0,
                    //         status: 200,
                    //         reason: '修改成功',
                    //         result: {
                    //             data: '成功',

                    //         },
                    //     });
                    // }
                })
            }

        })


    }

    async self_xx(req, res) {
        console.log(req.query.userName);
        // return ;
        let userName = req.query.userName;
        // console.log(userName);
        // return;
        db.query(`select * from user_table where userName=?`, [userName], (err, results) => {
            // console.log(results);
            // return;
            if (err) {
                console.log('err');
                res.json({
                    error_code: 1,
                    reason: '查询失败',
                    result: {},
                    err: err
                });
                return;
            } else {
                res.json({
                    error_code: 0,
                    reason: '查询成功',
                    result: {
                        data: results[0]
                    },
                    err: err
                });
                return;
            }
        })
        return;

    }
    async updata_sele_xx(req, res) {
        // console.log(req.body.name);
        let userName = req.body.userName;

        let phone = req.body.phone;
        let sex = req.body.sex;
        let login_name = req.body.login_name
        console.log(userName,phone,sex,login_name);
        // return;
        if (userName.trim() == '') {
            res.json({
                error_code: 1,
                status: 300,
                reason: '用户名不能为空',
                result: {},
            });
            return;
        }
        if (phone.trim() == '') {
            res.json({
                error_code: 1,
                status: 300,
                reason: '手机号码不能为空',
                result: {},
            });
            return;
        }
        // return;
        let phone_str = /^[1][3,5,7,8][0-9]{9}$/;
        if (phone_str.test(phone) == false) {
            console.log("2   --->    手机格式不对");
            res.json({
                error_code: 1,
                status: 300,
                reason: '手机号码格式不对',
                result: {},
            });
            return;
        };
        if (sex == "男" || sex == "女" || sex=='') {
            if(sex=='') {
                db.query('update user_table set userName=?,phone=?,sex="" where userName=?', [ userName,phone,login_name], (err, results) => {
                    // 执行 SQL 语句失败
                    if (err) {
                        console.log("2   --->    执行 SQL 语句失败55555");
                        res.json({
                            error_code: 1,
                            status: 300,
                            reason: '执行错误',
                            result: {},
                            err: err
                        });
                        return;
                    }
                    console.log(results[0]);
                    // return;
                    res.json({
                        error_code: 0,
                        status: 200,
                        reason: '修改成功',
                        result: {
                            str: '成功',
                        },
                    });
                })
            }else {
                db.query('update user_table set userName=?,phone=?,sex=? where userName=?', [ userName,phone, sex,login_name], (err, results) => {
                    // 执行 SQL 语句失败
                    if (err) {
                        console.log("2   --->    执行 SQL 语句失败55555");
                        res.json({
                            error_code: 1,
                            status: 300,
                            reason: '执行错误',
                            result: {},
                            err: err
                        });
                        return;
                    }
                    console.log(results[0]);
                    // return;
                    res.json({
                        error_code: 0,
                        status: 200,
                        reason: '修改成功',
                        result: {
                            str: '成功',
                        },
                    });
                })
            }
        }else{
            res.json({
                error_code: 1,
                status: 300,
                reason: '性别填写错误',
                result: {},
            });
            return;
        }
        // console.log(userName,phone,sex,login_name);
        
    }
}
module.exports = appController;