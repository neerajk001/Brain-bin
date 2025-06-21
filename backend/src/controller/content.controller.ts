import { Response,Request } from "express"
import { contentModel, linkModel } from "../models/user"
import { random } from "../lib/utils/random"
import { hash } from "bcrypt"
import { userModel } from "../models/user"


export const content =async(req:Request ,res:Response):Promise<any>=>{
    try {
        const {title ,type ,link, tags} =req.body
        console.log(tags)

        if(!title || !type || !link || !tags){
            return res.status(400).json({
                message:"all the fields are required"
            })
        }

        const userContent =new contentModel({
            title,
            type,
            link,
            tags,
            userId:req.user?._id
        })

        await userContent.save()
        return res.status(400).json({
            message:"content added successfully",
            userContent:userContent
        })


    } catch(error){
  console.log("error in protected routes",error)
  return res.status(500).json({ message: "Internal Server Error" });
}
    
}

export const getContent =async(req:Request , res:Response):Promise<any>=>{
   try {
     const content =await contentModel.find({userId:req.user?._id}).populate("userId","username")
    return res.status(200).json({
        content:content
    })
   } catch (error) {
    console.log("error in getting content",error)
    return res.status(500).json({
        message:"Internal server error"
    })
   }
}

export const dltContent =async(req:Request ,res:Response):Promise<any> =>{
  try {
      const contentId =req.params.id
    await contentModel.findByIdAndDelete({_id:contentId},{userId:req.user?._id})
    res.status(200).json({
        
        message:"deleted"
    })
  } catch (error) {
    console.log("error in  deleting",error)
  }
}



export const linkContent =async(req:Request ,res:Response):Promise<any> =>{
    const {share} =req.body

    try {
        if(share){
        const existingLink = await linkModel.findOne({userId:req.user?._id})

        if(existingLink){
            return res.json({
                hash: existingLink.hash
            })
        }


        const hash = random(10)
        const userLink = new linkModel({
            userId:req.user?._id,
            hash:hash
        })
       if(userLink){
        await userLink.save()
        return res.status(200).json({
            message:"link created",
            hash:hash
        })
       }
       else{
        return res.status(400).json({
            message:"error in creating link"
        })
       }

    }
    else{
        await linkModel.deleteOne({userId:req.user?._id})
        res.json({
            message:"link removed"
        })
    }
    } catch (error) {
        console.log("error while creating a link",error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}

export const shareContent = async(req:Request ,res:Response):Promise<any>=>{
    const hash =req.params.shareLink
    const link = await linkModel.findOne({hash})

    if(!link){
        return res.status(400).json({
            message:"incorrect share link inputs "
        })
    }

    const content =await contentModel.find({userId:link.userId})
    const user =await userModel.findById(link.userId)

    if (!user) {
    res.status(411).json({ message: "user not found, error should ideally not happen" });
    return;
  }
   res.json({ username: user.username, content });

}