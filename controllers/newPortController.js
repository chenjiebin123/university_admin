const BaseController = require('./baseController');
const db = require('../db/index');

const NewPortModel = require('../models/newPortModel');
const newPortModel = new NewPortModel();

class newPortController extends BaseController {
    constructor(req, res) {
        super(req, res)
    }

    // 渲染添加分类信息页面
    add() {
        console.log('11111');
        this.res.render('newPort/add.html')
    }

    // 渲染编辑分类信息页面
    async edit() {
        let { id } = this.req.query;
        console.log(id);
        let info = await newPortModel.edit(id);
        let data = info.data[0];
        this.res.render('newPort/edit.html', { data, message: null })
    }
    // 渲染编辑分类信息页面
    async detail() {
        let { id } = this.req.query;
        console.log(id);
        let info = await newPortModel.edit(id);
        let data = info.data[0];
        this.res.render('newPort/detail.html', { data, message: null })
    }
    // 查询所有分类信息（列表）
    async list(req, res) {
        let info = await newPortModel.list();
        // console.log(info);
        // return ;
        if (info.status == 1) {
            this.res.render('出错了');
            return;
        }
        if (info.status == 0) {
            console.log(info.status, "成功");
            // this.res.send("succcccccccc");
            // return ;
            this.res.render('newPort/list.html', { title: '分类展示', info: info.data });
        }

    }

    // 添加分类信息（添加信息）
    async store() {
        let { id, title, content, writer,time,image } = this.req.body;
        // console.log({ id, name, code , allCate_id });
        // return;
        if (title.trim() == '') {
            this.error(this.req, this.res, '/admin/newPort/add', { message: '添加失败 新闻标题不能为空', time: 2 });
            return;
        }
        if (content.trim() == '') {
            this.error(this.req, this.res, '/admin/newPort/add', { message: '添加失败 新闻内容不能为空', time: 2 });
            return;
        }
        // 调用数据库

        let info = await newPortModel.store({ id, title, content, writer,time,image });
        console.log(info, "sj");
        if (info.status == 1) {
            this.error(this.req, this.res, '/admin/newPort/add', info)
            return;
        }
        if (info.status == 0) {
            // this.res.send("success")
            // {status:0,message:'新增专业门类成功', time: 3 }
            this.res.render("sure.html", { status: true, message: info.message })
            return;
        }
    }

    // 查询单条分类信息
    async search() {
        let { name } = this.req.body;
        // 判断输入框是否为空
        if (name.trim() == "") {
            this.error(this.req, this.res, '/admin/newPort/list', { message: "搜索失败，专业分类名称不能为空", time: 3 });
            return;
        }
        // 调用数据库
        let info = await newPortModel.search({ name });
        if (info.status == 1) {
            console.log(info, "失败");
            this.error(this.req, this.res, '/admin/newPort/list', info);
            return;
        }
        if (info.status == 0) {
            console.log(info, "成功");
            this.res.render('newPort/list.html', { title: '分类展示', info: info.data });
            return;
        }
    }
    // 修改分类信息
    async updata() {
        console.log(this.req.body);

        let { id, title, content, writer,time,image } = this.req.body;
        // console.log({ id, name, code , allCate_id });
        // return;
        if (title.trim() == '') {
            this.error(this.req, this.res, '/admin/newPort/edit', { message: '修改失败 新闻标题不能为空', time: 2 });
            return;
        }
        if (content.trim() == '') {
            this.error(this.req, this.res, '/admin/newPort/edit', { message: '修改失败 新闻内容不能为空', time: 2 });
            return;
        }
        console.log('asdasd====>>>');
        // 调用模型完成入库操作
        let info = await newPortModel.updata({ id, title, content, writer,time,image });

        if (info.status == 0) {
            this.res.render("sure.html", { status: true, message: info.message })
            return;

        }
        if (info.status == 1) {
            this.res.render("sure.html", { status: false, message: info.message })
            return;
        }
    }
    // 删除分类信息
    async delete() {
        let { id } = this.req.query;
        // console.log(id);
        // return;
        let info = await newPortModel.delete(id);
        if (info.status == 0) {
            console.log("success");
            this.res.render("sure.html", { status: true, message: info.message })
            return;
        } else {
            console.log("error");
            this.res.render("sure.html", { status: false, message: info.message })
            return;
        }
    }
    // 删除多条数据
    async delete_more() {
        let { ids } = this.req.query;
        console.log(ids);
        let info = await newPortModel.delete_more(ids);
        if (info.status == 0) {
            this.res.render("sure.html", { status: true, message: info.message })
            return;
        } else {
            this.res.render("sure.html", { status: false, message: info.message })
            return;
        }
    }
}

module.exports = newPortController