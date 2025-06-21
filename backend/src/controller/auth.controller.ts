import { userModel } from "../models/user";
import { Request,Response } from "express";
import bcrypt from 'bcrypt'
import { generateAndSetCookie } from "../lib/utils/generateCookie";


export const signup =async(req:Request,res:Response):Promise<any>=>{
   try{
     const {username ,email, password} =req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"all felds are required"
        })
    }

    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
             return res.status(400).json({
                error:"Invalid email format"
            })
        }

        const existingUser =await userModel.findOne({
            username:username
        })

        if(existingUser){
            return res.status(400).json({
                message:"User is already taken"
            })
        }

        const existingEmail =await userModel.findOne({
            email:email
        })

        if(existingEmail){
            return res.status(400).json({
                message:"this email already taken"
            })
        }

        if(password.length<6){
            return res.status(400).json({
                message:" password must be 6 character or more"
            })
        }

        const hashedpassword =await bcrypt.hash(password ,10)

        const newuser =new userModel({
            username,
            email,
            password:hashedpassword
        })

        if(newuser){
            await newuser.save()
           await generateAndSetCookie(newuser._id,res)
            return res.status(200).json({
                message:"sigup successfull"
            })
        }else{
            return res.status(400).json({
                message:"error in signup"
            })
        }
   }catch(error){
        console.log("error in signup",error)
         res.status(500).json({
            message:"Internal server error"
        })
   }
              
}

export const signin = async (req:Request, res:Response):Promise<any>=>{

  try {
      const {identifier ,password} = req.body

    if(!identifier || !password){
        return res.status(400).json({
            message:"All the fields are required"
        })
    }

    const user =await userModel.findOne({
        $or:[{email:identifier}, {username:identifier}]
    })

    if(!user){
        return res.status(400).json({
            message:"user not found"
        })
    }

    const isCorrectPassword =bcrypt.compare(password ,user?.password || "")
   if(!isCorrectPassword){
    return res.status(400).json({
        message:"password is incorrect"
    })
   }

   generateAndSetCookie(user._id , res)

   res.status(200).json({
    message:"signin successfull",
    username:user.username,
    email:user.email
   })
  } catch (error) {
    console.log("error in  signin",error)
  }

}

