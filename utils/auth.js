function checkLogin(req, res, next) {
    // console.log(req.cookies.isLogin, 'req.cookies.isLogin');

    if (!req.cookies.isLogin) {

        res.redirect('/back/login');

    } else {
        next();// 代表是下一步的操作 请求---路由---控制器--模型
    }

}


module.exports = {
    checkLogin
}