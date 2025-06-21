import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Response } from "express";


export const generateAndSetCookie =(userId:String | Types.ObjectId ,res:Response) =>{
      if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
    const token =jwt.sign({userId},process.env.JWT_SECRET,
        {
            expiresIn:"15d"
        }
        
        
    )
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !=="development",
        maxAge:1000*60*60*24*15, //15 days
        sameSite:"strict"
    })
}