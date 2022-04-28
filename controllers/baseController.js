// 基类控制器，所有控制器的父类控制器，把控制器里面一些公共的代码提取出来，一般我们会封装 success 和 error 这样的方法

class BaseController {
    constructor(req, res) {
        // 把 req 和 res 定义为对象的属性
        this.req = req;
        this.res = res;
    }

    success(req, res,url, data) {
        data.time = data.time ? parseInt(data.time) : 3;
        res.render('success.html', {url, data});
    }

    error(req, res,url, data) {
        // console.log(url,'传递的数据');
        data.time = data.time ? parseInt(data.time) : 5;
        res.render('error.html', {url, data});

    }

    // render(req, res,templateName, data) {
    //     res.render(templateName, data);
    // }
}

module.exports = BaseController;