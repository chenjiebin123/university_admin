const BaseController = require('../controllers/baseController');
const db = require('../db/index');

const UniversityModel = require('../models/universityModel');
const universityModel = new UniversityModel();

class universityController extends BaseController {
    constructor(req, res) {
        super(req, res)
    }

    // 渲染添加学校信息页面
    add() {
        // new Promise((resolve, reject) => {
        //     db.query("select * from university_table ", (err, results) => {
        //         if (err) {
        //             reject({ status: 1, data: null, error: err });
        //             return;
        //         }
        //         resolve(this.res.render('university/add.html', { title: '专业门类的添加', message: null ,info:results}))
        //     })
        // })
        this.res.render('university/add.html')
    }

    // 渲染编辑学校信息页面
    async edit() {
        let { id} = this.req.query;
        console.log(id);
        let info = await universityModel.edit(id);
        let data = info.data[0];
        this.res.render('university/edit.html', { data, message: null })
    }
    async detail() {
        let { id} = this.req.query;
        console.log(id);
        let info = await universityModel.edit(id);
        let data = info.data[0];
        this.res.render('university/detail.html', { data, message: null })
    }

    // 查询所有学校信息（列表）
    async list(req, res) {
        // res.render("aaaa");
        // return
        let info = await universityModel.list();
        console.log(info);
        // return ;
        if (info.status == 1) {
            this.res.render('出错了');
            return;
        }
        if (info.status == 0) {
            console.log(info.status, "成功");
            // this.res.send("succcccccccc");
            // return ;
            this.res.render('university/list.html', { title: '学校展示', info: info.data });
        }

    }

    // 添加学校信息（添加信息）
    async store() {
        let { name,code,province,type,nature,ranking,is985,is211 ,isDoubleTop,briefIntroduction,area,teachersNum,studentsNum,studentTeacherRate,createTime,employedRate,furtherStudyRate,advancedMajorNum,masterMajorNum,doctorMajorNum,phone,address,badge,homePage,schoolScenery} = this.req.body;
        let obj = { name,code,province,type,nature,ranking,is985,is211 ,isDoubleTop,briefIntroduction,area,teachersNum,studentsNum,studentTeacherRate,createTime,employedRate,furtherStudyRate,advancedMajorNum,masterMajorNum,doctorMajorNum,phone,address,badge,homePage,schoolScenery}
        if (name.trim() == '') {
            this.error(this.req, this.res, '/admin/university/add', { message: ' 学校名称不能为空', time: 2 });
            return;
        }
        if (code.trim() == '') {
            this.error(this.req, this.res, '/admin/university/add', { message: ' 学校代码不能为空', time: 2 });
            return;
        }
        
        let info = await universityModel.store(obj);
        // console.log(info, "sj");
        if (info.status == 1) {
            this.error(this.req, this.res, '/admin/university/add', info)
            return;
        }
        if (info.status == 0) {
            // this.res.send("success")
            // {status:0,message:'新增专业门类成功', time: 3 }
            this.res.render("sure.html", { status: true, message: info.message })
            return;
        }
    }

    // 查询单条学校信息
    async search() {
        let { name } = this.req.body;
        console.log(name);
        // return;
        // 判断输入框是否为空
        if (name.trim() == "") {
            this.error(this.req, this.res, '/admin/university/list', { message: "搜索失败，学校名称不能为空", time: 3 });
            return;
        }
        // 调用数据库
        let info = await universityModel.search({ name });
        if (info.status == 1) {
            console.log(info, "失败");
            this.error(this.req, this.res, '/admin/university/list', info);
            return;
        }
        if (info.status == 0) {
            console.log(info, "成功");
            this.res.render('university/list.html', { title: '学校展示', info: info.data });
            return;
        }
    }
    // 修改学校信息
    async updata() {
        // console.log(this.req.body);

        let { id, name,code,province,type,nature,ranking,is985,is211 ,isDoubleTop,briefIntroduction,area,teachersNum,studentsNum,studentTeacherRate,createTime,employedRate,furtherStudyRate,advancedMajorNum,masterMajorNum,doctorMajorNum,phone,address,badge,homePage,schoolScenery} = this.req.body;
        let obj = { id, name,code,province,type,nature,ranking,is985,is211 ,isDoubleTop,briefIntroduction,area,teachersNum,studentsNum,studentTeacherRate,createTime,employedRate,furtherStudyRate,advancedMajorNum,masterMajorNum,doctorMajorNum,phone,address,badge,homePage,schoolScenery}
        if (name.trim() == '') {
            this.error(this.req, this.res, '/admin/university/edit', { message: '修改失败 学校名称不能为空', time: 2 });
            return;
        }
        if (code.trim() == '') {
            this.error(this.req, this.res, '/admin/university/edit', { message: '修改失败 学校代码不能为空', time: 2 });
            return;
        }
        // 调用模型完成入库操作
        let info = await universityModel.updata(obj);

        if (info.status==0) {
            this.res.render("sure.html",{status:true,message:info.message})
            return ;

        } 
        if(info.status==1) {
            this.res.render("sure.html",{status:false,message:info.message})
            return ;
        }
    }
    // 删除学校信息
    async delete() {
        let { id } = this.req.query;
        // console.log(id);
        // return;
        let info = await universityModel.delete(id);
        if (info.status == 0) {
            this.res.render("sure.html", { status: true, message: info.message })
            return;
        } else {
            this.res.render("sure.html", { status: false, message: info.message })
            return;
        }
    }
    // 删除多条数据
    async delete_more() {
        let { ids } = this.req.query;
        console.log(ids);
        let info = await universityModel.delete_more(ids);
        if (info.status == 0) {
            this.res.render("sure.html", { status: true, message: info.message })
            return;
        } else {
            this.res.render("sure.html", { status: false, message: info.message })
            return;
        }
    }
}

module.exports = universityController;