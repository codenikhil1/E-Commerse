const express = require('express')
const router = express.Router();
const user = require('../controller/user')
const auth = require('../controller/auth')
const product = require('../controller/product')

//paramas
router.param("userId",user.getUserById);
router.param("productId",product.getProductById)


//routes
//create route
router.post('/product/create/:userId',
auth.issignedin,
auth.isauthenticated,
auth.isadmin,
product.createproduct
)

//read route
router.get('/product/:productId',product.getProduct)
router.get('/product/photo/:productId',product.getPhoto)

//delete route
router.delete('/product/:productId/:userId',
auth.issignedin,
auth.isauthenticated,
auth.isadmin,
product.deleteProduct
)

//update route
router.put('/product/:productId/:userId',
auth.issignedin,
auth.isauthenticated,
auth.isadmin,
product.updateProduct
)

//listing route
router.get('/products',product.getAllProducts);

router.get('/products/categories',product.getAllUniqueCategories)



module.exports = router;