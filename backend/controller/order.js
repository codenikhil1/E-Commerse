const {Order,productCart} = require('../models/order')
const order = {
    getOrderById:(req,res,next)=>{
        Order.findById(id)
        .populate('products.product','name price')
        .exec((err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"No order found in DB"
                })
            }
            req.order = order;
            next()
        })
    },
    createOrder:(req,res)=>{
        req.body.order.user = req.profile;
        const order = new Order(req.body.order)
        order.save((err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"failed to save order in db"
                })
            }
            res.json(order)
        })
    },
    getAllOrders:(req,res)=>{
        Order.find()
        .populate('user','_id name')
        .exec((err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"Error in finding orders in DB"
                })
            }
            res.json(order)
        })
    },
    updateStatus:(req,res)=>{
        Order.update(
            {_id:req.body.orderId},
            {$set:{status:req.body.status}},
            (err,order)=>{
                if(err){
                    return res.status(400).json({
                        error:"Cannot update order status"
                    })
                }
                res.json(order)
            }
        )
    },
    getOrderStatus:(req,res)=>{
        res.json(Order.schema.path('status').enumValues)
    }
}
module.exports = order;