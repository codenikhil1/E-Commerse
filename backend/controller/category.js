const User = require('../models/user')
const Category = require('../models/category')
const category = {
    getCategoryById:(req,res,next,id)=>{
        Category.findById(id).exec((err,cate)=>{
            if(err ){
                return res.status(400).json({
                        error:"category not find"
                    })
            }
            req.category = cate;
            next()
        })
   },
   createCategory:(req,res)=>{
       const category = new Category(req.body)
       category.save((err,cate)=>{
            if(err ){
                return res.status(400).json({
                    error:"Not able to save category in Db"
                })
            }
            return res.json({category})
       })
   },
   getCategory:(req,res)=>{
         return res.json(req.category)
   },
   getAllCategory:(req,res)=>{
        Category.find().exec((err,categories)=>{
            if(err){
                return res.status(400).json({
                    error:"No categories Found"
                })
            }
            res.json(categories)
        })
   },
   //update
   updateCategory:(req,res)=>{
       //we can do monngodb operation on category beacause it is coming from collection
       //we put category in request by pulling it from collection(see categoryById method)
       //if u thought how category(NOT Category) can do save() operation
       const category = req.category;
        category.name = req.body.name
       category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error:"Ffailed to update category"
            })
        }
       res.json(updatedCategory)
       })
   },
   //delete
   deleteCategory:(req,res)=>{
       const category = req.category;
       const name = category.name;
       category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Ffailed to delete category"
            })
        }
        res.json({
            message:`${name} successfully deleted`
        })

       })
   }
}

module.exports = category