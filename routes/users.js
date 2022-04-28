var express = require('express');
var router = express.Router();
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

const UserController = require('../controllers/userController');
const userController = new UserController();

// // 注册新用户
router.post('/register', userController.register.bind(userController))

// // 登录
router.post('/login', userController.checkLogin.bind(userController))

router.get('/login', (req, res) => {
  res.render("user/login.html", { title: '高校信息查询系统-后台登录页面' })
})
router.get('/register', (req, res) => {
  res.render("user/register.html", { title: '高校信息查询系统-后台注册页面' })
})
router.get('/logout', (req, res) => {
  res.cookie('isLogin', '', { maxAge: -1 });
  res.cookie('username', '', { maxAge: -1 });

  res.redirect('/back/login');
})
module.exports = router;
