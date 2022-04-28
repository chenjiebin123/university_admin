var express = require('express');
var router = express.Router();
const db = require('../../db/index')
const ApiController = require('../../controllers/api/appController')


let apiController;
router.use(function (req,res,next) {
    apiController = new ApiController(req,res);
    next()
});
//获取学校列表API
router.get('/getUniversityList', (req, res) => {
    apiController.getUniversityList(req, res);
  })
//获取专业列表API
router.get('/getMajorList', (req, res) => {
  apiController.getMajorList(req, res);
})
//获取学校详情API
router.get('/getUniversityDetail', (req, res) => {
    apiController.getUniversityDetail(req, res);
  })
//获取专业详情API
router.get('/getMajorDetail', (req, res) => {
  apiController.getMajorDetail(req, res);
})
//获取类似的专业详情API
router.get('/getsimilarMajorList', (req, res) => {
  apiController.getsimilarMajorList(req, res);
})
//搜索学校
router.post('/searchUniversity', (req, res) => {
    apiController.searchUniversity(req, res);
  })
//搜索专业
router.post('/searchMajor', (req, res) => {
  apiController.searchMajor(req, res);
})
//条件搜索学校
router.post('/selectUniversity', (req, res) => {
  apiController.selectUniversity(req, res);
})
//条件搜索专业
router.post('/selectMajor', (req, res) => {
  apiController.selectMajor(req, res);
})
//条件搜索另外的搜索条件---》专业
router.post('/majorSelect', (req, res) => {
  apiController.majorSelect(req, res);
})
//获取专业层次API
router.get('/major_cenci', (req, res) => {
  apiController.major_cenci(req, res);
})
//获取专业类别API
router.get('/major_leibie', (req, res) => {
  apiController.major_leibie(req, res);
})
//获取分类类别API
router.get('/major_fenlei', (req, res) => {
  apiController.major_fenlei(req, res);
})
//用户登录
router.post('/user_login', (req, res) => {
  apiController.user_login(req, res);
})
//注册用户
router.post('/user_register', (req, res) => {
  apiController.user_register(req, res);
})
//获取高考新闻API
router.get('/getNewprot', (req, res) => {
  apiController.getNewprot(req, res);
})
//获取高考新闻详细API
router.get('/getNewprotDetail', (req, res) => {
  apiController.getNewprotDetail(req, res);
})
//收藏院校API
router.get('/addUniversityLike', (req, res) => {
  apiController.addUniversityLike(req, res);
})
//删除收藏院校API
router.get('/delectUniversityLike', (req, res) => {
  apiController.delectUniversityLike(req, res);
})
//收藏专业API
router.get('/addMajorLike', (req, res) => {
  apiController.addMajorLike(req, res);
})
//删除收藏专业API
router.get('/delectMajorLike', (req, res) => {
  apiController.delectMajorLike(req, res);
})
//查询是否收藏院校API
router.get('/searchUniversityLike', (req, res) => {
  apiController.searchUniversityLike(req, res);
})
//查询是否收藏专业API
router.get('/searchMajorLike', (req, res) => {
  apiController.searchMajorLike(req, res);
})
//查询收藏院校列表API
router.get('/UniversityLikeList', (req, res) => {
  apiController.UniversityLikeList(req, res);
})
//查询收藏院校列表API
router.get('/MajorLikeList', (req, res) => {
  apiController.MajorLikeList(req, res);
})
//修改密码
router.post('/updata_pw', (req, res) => {
  apiController.updata_pw(req, res);
})
//查看个人信息
router.get('/self_xx', (req, res) => {
  apiController.self_xx(req, res);
})
router.post('/updata_sele_xx', (req, res) => {
  apiController.updata_sele_xx(req, res);
})
module.exports=router;