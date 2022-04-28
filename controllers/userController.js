const md5 = require('md5');
const db = require('../db/index')
const bcrypt = require('bcryptjs') //加密密码依赖包
const jwt = require('jsonwebtoken') //生成Token字符串依赖包
const BaseController = require('../controllers/baseController');
const UserModel = require('../models/userModel');


const userModel = new UserModel();


class userController extends BaseController {
    // 用户登录
    async checkLogin(req,res){
        console.log(req.body);
        // return ;
        // res.send("login");
        let {username,password} = req.body;

        // 判断用户名输入框是否为空
        if(username.trim() == '') {
            this.error(req,res,'/back/login',{message:'登陆失败 用户名不能为空',time:3});
            return;
        }
        // 判断密码输入框是否为空
        if(password.trim() == '') {

            this.error(req, res,'/back/login', {message: '登录失败 密码不能为空', time: 3});
            return;
        }

        try{
            let that = this;
            console.log("11");
            let info =   await userModel.checkLogin({username,password});
            // res.send( info );
            console.log(info.status);
            if(info.status==1){
                that.error(req,res,'/back/login',info)
                return;
            }
            if(info.status==0){
                console.log(info.status,"成功");
                res.cookie('isLogin', true, {});//设置cookie，表明登录成功
                res.cookie('username', username, {});//设置cookie，设置登录的用户名

                that.success(req,res,'/home',info)
                return;
            }
        }catch(e){
            res.send( e );

        }


    }
    // 用户注册
    async register(req,res) {

        console.log(req.body,'数据');
        // res.send("register");
        let {username,password,phone} = req.body;
       
         // 判断用户名输入框是否为空
         if(username.trim() == '') {
             console.log(1,"空数据");
            //  this.error(req, res, '/admin/login', {msg: '登录失败 用户名不能为空', time: 2});
            this.error(req, res, '/back/register',{message:'登陆失败 用户名不能为空',time:3});
            return;
        }
        // 判断密码输入框是否为空
        if(password.trim() == '') {
            console.log(2,"空数据");
            this.error(req, res, '/back/register', {message: '登录失败 密码不能为空', time: 3});
            return;
        }
        // 判断密码格式是否合格
        else{
            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(password)){
                this.error(req, res, '/back/register', {message: '密码必须包含字母和数字，且在6~18位之间', time: 3});
                return ;
            }
        }
        // 判断手机号码是否正确
        if(phone.length!=11) {
            this.error(req, res, '/back/register', {message: '登录失败 手机号码格式不正确', time: 3});
            return;
        }
        // 判断手机号码格式是否正确
        else{
            if(!/^1[3|4|5|7|8]\d{9}$/.test(phone)){
                this.error(req, res, '/back/register', {message: '登录失败 手机号码格式不正确', time: 3});
                return ;
            }
        }
        password = bcrypt.hashSync(password, 10);

        // 接受数据库返回值
        try{
            let that = this;
            let info =   await userModel.register({username,password,phone});
            // res.send( info );
            console.log(info.status);
            if(info.status==1){
                that.error(req,res,'/back/register',info)
                return;
            }
            if(info.status==0){
                that.success(req,res,'/back/login',info)
                return;
            }
        }catch(e){
            res.send( e );

        }


    }

}
module.exports = userController;