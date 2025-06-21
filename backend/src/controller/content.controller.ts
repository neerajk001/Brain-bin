import { Response,Request } from "express"
import { contentModel } from "../models/user"
import { random } from "../lib/utils/random"


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



export const shareContent =async(req:Request ,res:Response) =>{
    const {share} =req.body

    
}