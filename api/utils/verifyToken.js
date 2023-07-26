import Jwt  from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req,res,next) =>{
  const token = req.cookies.access_token;
  if(!token){
    return next(createError(401,"You are not authenticated"))
  }

  Jwt.verify(token,process.env.JWT, (err,user)=> {
        if(err) return next(createError(403,"Token is not valid!!"))

        req.user = user; //it will hold userid and isAdmin, //we can define anything unique on req.user,req.hello etc
        next() //if everything is verified then we are going to proceed with next operations.
    })
}

export const verifyUser = (req,res,next) => {
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else {
            return next(createError(403,"You are not authorized"))
        }
    })
}
//if(req.user.id === req.params.id) => if user.id which is in JWT token ==== params.id(the id of the current user)

export const verifyAdmin = (req,res,next) =>{
    verifyToken(req,res,next, ()=>{
        if(req.user.isAdmin){
            next()
        } else {
            return next(createError(403,"You are not authorized"))
        }
    })
}