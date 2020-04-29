const express = require('express')
const router = express.Router();
const user = require('../controller/user')
const auth = require('../controller/auth')
const order = require('../controller/order')
const product = require('../controller/product')

//params
router.param('userId',user.getUserById)
router.param('orderId',order.getOrderById)

//router


//create
router.post('/order/create/:userId',
auth.issignedin,
auth.isauthenticated,
user.pushOrderInPurchaseList,
product.updateStock,
order.createOrder
)

router.get('/order/all/:userId',
auth.issignedin,
auth.isauthenticated,
auth.isadmin,
order.getAllOrders
)
//status of order
router.get('/order/status/:userId',
auth.issignedin,
auth.isauthenticated,
auth.isadmin,
order.getOrderStatus
)
router.put('/order/:orderId/status/:userid',
auth.issignedin,
auth.isauthenticated,
auth.isadmin,
order.updateStatus
)

module.exports = router;