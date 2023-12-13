var express = require('express');
const { createData, signIn, alldata, forgotpassword, resetpassword } = require('../controller/mailControl');
const auth = require('../Middleware/auth');
const addProduct = require('../controller/addproductcontrol');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/', createData);
router.get('/login',signIn);
router.get('/alldata',alldata);
router.post('/adddetail',auth,addProduct);
router.post('/forgotpassword', forgotpassword);
router.post('/resetpassword', resetpassword);

module.exports = router;
