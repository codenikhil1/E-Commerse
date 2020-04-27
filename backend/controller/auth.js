const User = require('../models/user');
const {check,validationResult} = require('express-validator')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
const auth = {
    
    signout:(req,res)=>{
        //clearing cookie which have name toke
        res.clearCookie("token")
        return res.json({
            message:"user signout"
        })   
    },
    signin:(req,res)=>{
        //extracting emain and pass from bodt
        const {email,password} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()[0].msg });
        }

        User.findOne({email},(err,user)=>{
                if(err || !user){
                    return res.status(400).json({
                        error:"User email doesnt exist"
                    })
                }
        //authenticate is method in user schema
            if(!user.authenticate(password)){
               return res.status(401).json({
                    error:"Email and Password dont match"
                })
            }
            //create token
            const token = jwt.sign({_id:user._id},process.env.SECRET)
            //put token in cookie
            res.cookie("token",token,{expire:new Date() + 2});
            
            //send res to front end
            const {_id,name,email,role}  = user;
            return res.json({
                    token,
                    user:{_id,name,email,role}
            })
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
         
        
    },
    //protected routes
    issignedin:expressJwt({
        secret:process.env.SECRET,
        userProperty:"auth"
    }),
    //custome middlewares
    isauthenticated:(req,res,next)=>{
        //req.profile is coming from frontend
        //req.auth is put in req by protected routes see above
        const checker = req.profile && req.auth && req.profile._id == req.auth._id
        if(!checker){
            res.status(403).json({
                error:"Access DENIED"
            })
        }
        next()
    },
    isadmin:(req,res,next)=>{
        if(req.profile.role === 0){
            res.status(403).json({
                error:"Your nor Admin"
            })
        }
        next()
    }
}
module.exports = auth;


