var express = require('express');
var router = express.Router();
const AdminController = require("../controllers/adminController");
const { route } = require('./users');


let adminController;
router.use(function (req,res,next) {
    adminController = new AdminController(req,res);
    next()
});


router.get('/list', ()=>{
    adminController.list();
});
router.post('/search',()=>{
    // res.send(req.body)
    adminController.search();
})
router.get('/delete',()=>{
    adminController.delete();
})
router.get('/delete_more',()=>{
    adminController.delete_more();
})
module.exports = router;