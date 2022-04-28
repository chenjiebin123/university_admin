const BaseController = require('./baseController');


const AdminModel = require('../models/adminModel');
const adminModel = new AdminModel();

class adminController extends BaseController {
    constructor(req, res) {
        super(req, res)
    }

    // 查询所有门类信息（列表）
    async list(req, res) {
        let info = await adminModel.list();
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
            this.res.render('admin/list.html', { title: '管理员展示', info: info.data });
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
            this.error(this.req,this.res,'/admin/admin/list',{message:"搜索失败，管理员名称不能为空",time:3});
            return ;
        }
        // 调用数据库
        let info = await adminModel.search({username});
        if(info.status ==1 ){
            console.log(info,"失败");
            this.error(this.req,this.res,'/admin/admin/list',info);
            return ;
        }
        if(info.status == 0){
            console.log(info,"成功");
            this.res.render('admin/list.html', { title: '分类展示', info: info.data });
            // this.success(this.req,this.res,'/admin/major_allCate/list',info);
            return ;
        }
    }

    // 删除门类信息
    async delete(){
        let {id} = this.req.query;
        console.log(id);
        let info = await adminModel.delete(id);
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
        let info = await adminModel.delete_more(ids);
        if(info.status == 0){
            this.res.render("sure.html",{status:true,message:info.message})
            return ;
        }else{
            this.res.render("sure.html",{status:false,message:info.message})
            return ;
        }
    }
}

module.exports = adminController