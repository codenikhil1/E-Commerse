var express = require('express');
var router = express.Router();
const {check} = require('express-validator')
const auth = require('../controller/auth')


router.post('/signup',[
    check('name','name should be at least 3').isLength({min:3}),
    check('email','email should be correct').isEmail(),
    check('password','password at leat 5 letters').isLength({min:5})

],auth.signup)
router.get('/signout',auth.signOut)

module.exports = router;