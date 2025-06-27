import { userModel } from "../models/user";
import { Response,Request,NextFunction } from "express";
import jwt from 'jsonwebtoken';



export const protectedRoutes =async(req:Request,res:Response,next:NextFunction)=>{
     console.log("COOKIES RECEIVED:", req.cookies);
    interface JwtPayload {
  userId: string;
}


  try{
      const token  =req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"error,you need to login first"
        })
    }
           if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

    const decoded =jwt.verify(token ,process.env.JWT_SECRET) as JwtPayload
    if(!decoded){
        return res.status(401).json({
            message:"Invalid token"
        })
    }

    const user  = await userModel.findById(decoded.userId).select("-password")
    if(!user){
        return res.status(400).json({
            message:"user not found"
        })
    }
    req.user = user
    next()

    
  }catch(error){
        console.log("error in protected routes",error)
  }

}
