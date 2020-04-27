var express = require('express');
var router = express.Router();
const {check} = require('express-validator')
const auth = require('../controller/auth')


router.post('/signup',
//using express validator to validate entered information
[
    check('name','name should be at least 3').isLength({min:3}),
    check('email','email should be correct').isEmail(),
    check('password','password at leat 5 letters').isLength({min:5})

],auth.signup)

router.post('/signin',[
    check('email','email should be correct').isEmail(),
    check('password','password at leat 5 letters').isLength({min:5})
],auth.signin)
router.get('/signout',auth.signout)
router.get('/issignedin',auth.issignedin,(req,res)=>{
    res.send('protected route')
})




module.exports = router;