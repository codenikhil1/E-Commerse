const User = require('../models/user');
const {check,validationResult} = require('express-validator')
const auth = {
    signOut : (req,res)=>{
        res.json({
            message:"User SignOut"
        })
    },
    signup:(req,res)=>{
        //checking validatin done in routes and binding error from req
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
             if (!errors.isEmpty()) {
                 return res.status(422).json({ errors: errors.array()[0].msg });
         }
        const user = new User(req.body);
        user.save((err,user)=>{
            if(err){
                return res.status(400).json({
                    err:"Failed to put user in DB"
                })
            }
            res.json({
                name:user.name,
                email :user.email,
                id:user._id
            })
        })
         
        
    }
}
module.exports = auth;


