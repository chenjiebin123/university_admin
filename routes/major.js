var express = require('express');
var router = express.Router();
const MajorController = require("../controllers/majorController");
const { route } = require('./users');


let majorController;
router.use(function (req,res,next) {
    majorController = new MajorController(req,res);
    next()
});

router.get('/add',()=>{
    majorController.add();
})
router.post('/store', ()=>{
    majorController.store();
});

router.get('/list', ()=>{
    majorController.list();
});
router.get('/edit',()=>{
    majorController.edit();
});
router.get('/detail',()=>{
    majorController.detail();
});
router.post('/search',()=>{
    // res.send(req.body)
    majorController.search();
})
router.post('/updata',()=>{
    majorController.updata();
})
router.get('/delete',()=>{
    majorController.delete();
})
router.get('/delete_more',()=>{
    majorController.delete_more();
})
module.exports = router;



