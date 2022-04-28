const BaseController = require('./baseController');


const AppUserModel = require('../models/appUserModel');
const appUserModel = new AppUserModel();

class appUserController extends BaseController {
    constructor(req, res) {
        super(req, res)
    }

    // 查询所有门类信息（列表）
    async list(req, res) {
        let info = await appUserModel.list();
        console.log(info);
        // return ;
        if (info.status == 1) {
            this.res.render('es');
            return;
        }
        if (info.status == 0) {
                console.log(info.status, "成功");
                // this.res.send("succcccccccc");
                // return ;
            this.res.render('appUser/list.html', { title: '用户展示', info: info.data });
        }

    }

    // 查询单条门类信息
    async search(){
        // this.res.send(this.req.body)
        // console.log(this.req.body);
        // console.log("查询");
        let {username} = this.req.body;
        // 判断输入框是否为空
        if(username.trim()==""){
            this.error(this.req,this.res,'/admin/appUser/list',{message:"搜索失败，用户名称不能为空",time:3});
            return ;
        }
        // 调用数据库
        let info = await appUserModel.search({username});
        if(info.status ==1 ){
            console.log(info,"失败");
            this.error(this.req,this.res,'/admin/appUser/list',info);
            return ;
        }
        if(info.status == 0){
            console.log(info,"成功");
            this.res.render('appUser/list.html', { title: '用户展示', info: info.data });
            // this.success(this.req,this.res,'/admin/major_allCate/list',info);
            return ;
        }
    }

    // 删除门类信息
    async delete(){
        let {id} = this.req.query;
        console.log(id);
        let info = await appUserModel.delete(id);
        if(info.status == 0){
            this.res.render("sure.html",{status:true,message:info.message})
            return ;
        }else{
            this.res.render("sure.html",{status:false,message:info.message})
            return ;
        }
    }
    // 删除多条数据
    async delete_more(){
        let {ids} = this.req.query;
        console.log(ids);
        let info = await appUserModel.delete_more(ids);
        if(info.status == 0){
            this.res.render("sure.html",{status:true,message:info.message})
            return ;
        }else{
            this.res.render("sure.html",{status:false,message:info.message})
            return ;
        }
    }
}

module.exports = appUserController