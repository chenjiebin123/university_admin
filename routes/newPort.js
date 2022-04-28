var express = require('express');
var router = express.Router();
const NewPortController = require("../controllers/newPortController");
const { route } = require('./users');


let newPortController;
router.use(function (req,res,next) {
    newPortController = new NewPortController(req,res);
    next()
});

router.get('/add',()=>{
    newPortController.add();
})
router.post('/store', ()=>{
    newPortController.store();
});

router.get('/list', ()=>{
    newPortController.list();
});
router.get('/edit',()=>{
    newPortController.edit();
});
router.get('/detail',()=>{
    newPortController.detail();
});
router.post('/search',()=>{
    // res.send(req.body)
    newPortController.search();
})
router.post('/updata',()=>{
    newPortController.updata();
})
router.get('/delete',()=>{
    newPortController.delete();
})
router.get('/delete_more',()=>{
    newPortController.delete_more();
})
module.exports = router;