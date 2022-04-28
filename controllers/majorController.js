const BaseController = require('../controllers/baseController');
const db = require('../db/index');

const MajorModel = require('../models/majorModel');
const majorModel = new MajorModel();

class majorController extends BaseController {
    constructor(req, res) {
        super(req, res)
    }

    // 渲染添加分类信息页面
    add() {
        this.res.render('major/add.html')
    }

    // 渲染编辑分类信息页面
    async edit() {
        let { id} = this.req.query;
        console.log(id);
        let info = await majorModel.edit(id);
        let data = info.data[0];
        this.res.render('major/edit.html', { data, message: null })
    }
    async detail() {
        let { id} = this.req.query;
        console.log(id);
        let info = await majorModel.edit(id);
        let data = info.data[0];
        this.res.render('major/detail.html', { data, message: null })
    }

    // 查询所有分类信息（列表）
    async list(req, res) {
        let info = await majorModel.list();
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
            this.res.render('major/list.html', { title: '分类展示', info: info.data });
        }

    }

    // 添加分类信息（添加信息）
    async store() {
        let { id, majorName, subject,majorType,majorCode,level,schoolYear,degree,similarMajor,summary,educationGoal ,educationRequire,famousScholar,mainCourse,courseRequire,knowledgeAbility,boyGirlRate,wenLikeRate,graduateNum,avgSalary,jobRankingOfAll,jobRankingOfSubject,lastYearEmployedRate,maxRequireCity,maxRequireIndustry } = this.req.body;
        let obj = { id, majorName, subject,majorType,majorCode,level,schoolYear,degree,similarMajor,summary,educationGoal ,educationRequire,famousScholar,mainCourse,courseRequire,knowledgeAbility,boyGirlRate,wenLikeRate,graduateNum,avgSalary,jobRankingOfAll,jobRankingOfSubject,lastYearEmployedRate,maxRequireCity,maxRequireIndustry }
        // console.log({ id, name, year,work_future,work_direction,culture_target,culture_ask,culture_power,culture_practice,major_class,cate_id ,code });
        // return;
        if (majorName.trim() == '') {
            this.error(this.req, this.res, '/admin/major/add', { message: '修改失败 专业名称不能为空', time: 2 });
            return;
        }
        if (majorCode.trim() == '') {
            this.error(this.req, this.res, '/admin/major/add', { message: '修改失败 专业代码不能为空', time: 2 });
            return;
        }
        // 调用数据库
        
        let info = await majorModel.store(obj);
        console.log(info, "sj");
        if (info.status == 1) {
            this.error(this.req, this.res, '/admin/major/add', info)
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
        console.log(name);
        // 判断输入框是否为空
        if (name.trim() == "") {
            this.error(this.req, this.res, '/admin/major/list', { message: "搜索失败，专业分类名称不能为空", time: 3 });
            return;
        }
        // 调用数据库
        let info = await majorModel.search({ name });
        if (info.status == 1) {
            console.log(info, "失败");
            this.error(this.req, this.res, '/admin/major/list', info);
            return;
        }
        if (info.status == 0) {
            console.log(info, "成功");
            this.res.render('major/list.html', { title: '分类展示', info: info.data });
            return;
        }
    }
    // 修改分类信息
    async updata() {
        console.log(this.req.body);

        let { id, majorName, subject,majorType,majorCode,level,schoolYear,degree,similarMajor,summary,educationGoal ,educationRequire,famousScholar,mainCourse,courseRequire,knowledgeAbility,boyGirlRate,wenLikeRate,graduateNum,avgSalary,jobRankingOfAll,jobRankingOfSubject,lastYearEmployedRate,maxRequireCity,maxRequireIndustry } = this.req.body;
        let obj = { id, majorName, subject,majorType,majorCode,level,schoolYear,degree,similarMajor,summary,educationGoal ,educationRequire,famousScholar,mainCourse,courseRequire,knowledgeAbility,boyGirlRate,wenLikeRate,graduateNum,avgSalary,jobRankingOfAll,jobRankingOfSubject,lastYearEmployedRate,maxRequireCity,maxRequireIndustry }
        // console.log({ id, name, year,work_future,work_direction,culture_target,culture_ask,culture_power,culture_practice,major_class,cate_id ,code });
        // return;
        if (majorName.trim() == '') {
            this.error(this.req, this.res, '/admin/major/edit', { message: '修改失败 专业名称不能为空', time: 2 });
            return;
        }
        if (majorCode.trim() == '') {
            this.error(this.req, this.res, '/admin/major/edit', { message: '修改失败 专业代码不能为空', time: 2 });
            return;
        }
        // 调用模型完成入库操作
        let info = await majorModel.updata(obj);

        if (info.status==0) {
            this.res.render("sure.html",{status:true,message:info.message})
            return ;

        } 
        if(info.status==1) {
            this.res.render("sure.html",{status:false,message:info.message})
            return ;
        }
    }
    // 删除分类信息
    async delete() {
        let { id } = this.req.query;
        // console.log(id);
        // return;
        let info = await majorModel.delete(id);
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
        let info = await majorModel.delete_more(ids);
        if (info.status == 0) {
            this.res.render("sure.html", { status: true, message: info.message })
            return;
        } else {
            this.res.render("sure.html", { status: false, message: info.message })
            return;
        }
    }
}

module.exports = majorController