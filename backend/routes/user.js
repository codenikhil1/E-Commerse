const express = require('express');
const router = express.Router();
const User = require('../models/user')
const UserController = require('../controller/user')
const authController = require('../controller/auth')

router.param('userId',UserController.getUserById)

router.get('/user/:userId',authController.issignedin,authController.isauthenticated,UserController.getUser)
router.put('/user/:userId',authController.issignedin,authController.isauthenticated,UserController.updateUser)
router.put('/user/orders/:userId',authController.issignedin,authController.isauthenticated,UserController.userPurchaseList)


module.exports = router;