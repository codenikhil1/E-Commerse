const express = require('express')
const router = express.Router();
const categoryController = require('../controller/category');
const userController = require('../controller/user');
const authController = require('../controller/auth');

//params
router.param("userId",userController.getUserById)
router.param("categoryId",categoryController.getCategoryById)

//Routes


router.post('/category/create/:userId',
//authController.isauthenticated,
authController.issignedin,
authController.isadmin,
categoryController.createCategory)

//read routes
router.get('/category/:categoryId',categoryController.getCategory)
router.get('/categories',categoryController.getAllCategory)


//update routes
router.put("/category/:categoryId/:userId",
//authController.isauthenticated,
authController.issignedin,
authController.isadmin,
categoryController.updateCategory
)
router.delete("/category/:categoryId/:userId",
//authController.isauthenticated,
authController.issignedin,
authController.isadmin,
categoryController.deleteCategory
)

module.exports = router;