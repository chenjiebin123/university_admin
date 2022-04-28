var express = require('express');
var router = express.Router();
const UniversityController = require("../controllers/universityController");
const { route } = require('./users');


let universityController;
router.use(function (req,res,next) {
    universityController = new UniversityController(req,res);
    next()
});

router.get('/add',()=>{
    universityController.add();
})
router.post('/store', ()=>{
    universityController.store();
});

router.get('/list', ()=>{
    // console.log('1111---->>>');
    universityController.list();
});
router.get('/edit',()=>{
    universityController.edit();
});
router.get('/detail',()=>{
    universityController.detail();
});
router.post('/search',()=>{
    universityController.search();
})
router.post('/updata',()=>{
    universityController.updata();
})
router.get('/delete',()=>{
    universityController.delete();
})
router.get('/delete_more',()=>{
    universityController.delete_more();
})
module.exports = router;



