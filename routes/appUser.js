var express = require('express');
var router = express.Router();
const AppUserController = require("../controllers/appUserController");
const { route } = require('./users');


let appUserController;
router.use(function (req,res,next) {
    appUserController = new AppUserController(req,res);
    next()
});



router.get('/list', ()=>{
    appUserController.list();
});
router.post('/search',()=>{
    // res.send(req.body)
    appUserController.search();
})
router.get('/delete',()=>{
    appUserController.delete();
})
router.get('/delete_more',()=>{
    appUserController.delete_more();
})
module.exports = router;