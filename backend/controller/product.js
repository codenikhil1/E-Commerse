const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')



const product = {
    getProductById:(req,res,next,id)=>{
        Product.findById(id)
        .populate("category")
        .exec((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"product not fount"
                })
            }
            req.product = product;
            next()
        })
    },
    createproduct:(req,res)=>{
        let form = new formidable.IncomingForm();
        //for saving file in png or jpeg format
        form.keepExtensions = true;
        form.parse(req,(err,fields,file)=>{
            if(err){
                return res.status(400).json({
                    error:"problem with image"
                })
            }
           // destructure the fields
            const{price,name,description,category,stock} = fields;
            if(!name || !description || !category || !stock || !price){
                return res.status(400).json({
                    error:"please include all fields"
                })
            }



            let tshirt = new Product(fields)

            //handle file
            if(file.photo){
                if(file.photo.size > 3000000){
                    return res.status(400).json({
                        error:"file size is big need <3mb"
                    })
                }
                tshirt.photo.data = fs.readFileSync(file.photo.path)
                tshirt.photo.contentType = file.photo.type

            }

            //save to DB
            tshirt.save((err,tshirt)=>{
                if(err){
                    return res.status(400).json({
                        error:"saving a t-shirt in DB failed"
                    })
                }
                res.json(tshirt)
            })
        })

    },
    getProduct:(req,res)=>{
        req.product.photo = undefined;
        return res.json(req.product)
    },
    //middleware
    getPhoto:(req,res,next)=>{
        if(req.product.photo.data){
            res.set('Content-Type',req.product.photo.contentType)
            return res.send(req.product.photo.data)
        }
        next()
    },
    deleteProduct:(req,res)=>{
        let productdeleted  = req.product;
        productdeleted.remove((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"failed to delete the product"
                })
            }
            res.json({
                msg:"deletetion seccessfull"
            })
        })
    },
    updateProduct:(req,res)=>{
        let form = new formidable.IncomingForm();
        //for saving file in png or jpeg format
        form.keepExtensions = true;
        form.parse(req,(err,fields,file)=>{
            if(err){
                return res.status(400).json({
                    error:"problem with image"
                })
            }
            let tshirt = req.product;
            //since we are updating tshirt loadsh's extend 
            //method help us
            //it simply update tshirt by fields
            tshirt = _.extend(tshirt,fields)
            //handle file
            if(file.photo){
                if(file.photo.size > 3000000){
                    return res.status(400).json({
                        error:"file size is big need <3mb"
                    })
                }
                tshirt.photo.data = fs.readFileSync(file.photo.path)
                tshirt.photo.contentType = file.photo.type
            }
            //save to DB
            tshirt.save((err,tshirt)=>{
                if(err){
                    return res.status(400).json({
                        error:"updation of t-shirt in DB failed"
                    })
                }
                res.json(tshirt)
            })
        })
     

    },
    getAllProducts:(req,res)=>{
        let limit = req.query.limit ? parseInt(req.query.limit) : 8
        let sortBy = req.query.sortby ? req.query.sortby  : '_id' 
        Product.find()
        //dont select photo
        .select('-photo')
        .populate('category')
        .sort([[sortBy,'asc']])
        .limit(limit)
        .exec((err,products)=>{
            if(err){
                return res.status(400).json({
                    error:"Not able to get products"
                })
            }
            res.json(products)
        })
    },
    updateStock:(req,res,next)=>{
        let myOperations = req.body.order.products.map(prod =>{
            return {
                updateOne :{
                    filter:{_id:prod._id},
                    update:{$inc : {stock : -prod.count,sold : +prod.count}}
                }
            }
        })
        Product.bulkWrite(myOperations,{},(err,products)=>{
            if(err){
                return res.status(400).json({
                    error:"bulf operation Failed"
                })
            }
        })
        next()
    },
    getAllUniqueCategories:(req,res)=>{
        Product.distinct('category',{},(err,categories)=>{
            if(err){
                return res.status(400).json({
                    eror:"No category Found"
                })
            }
            res.json(category)
        })
    }
}
module.exports = product