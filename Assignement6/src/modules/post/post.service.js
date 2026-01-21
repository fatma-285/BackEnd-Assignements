import postModel from "../../DB/models/post.model.js"
import userModel from "../../DB/models/user.model.js"
import commentModel from "../../DB/models/comment.model.js"
import { Sequelize } from "sequelize";

//? 1. Create new Post (using new instance and save) (Get the post data from the body). 

export const createPost=async(req,res,next)=>{
    try{
     const {title,content,userId}=req.body;
     const user=await userModel.findByPk(userId);
     const post=new postModel({title,content,userId});
     if(!user){
        return res.status(400).json({message:"user not found"})
     }
     await post.save();
     res.status(201).json({message:"post created successfully",post})
    }catch(error){
        res.status(400).json({message:error.message})
    }
} 

//? 2. Delete a post by its id (Ensure that only the owner of the post can perform this action)

export const deletePost=async(req,res,next)=>{
    try{
    const {id}=req.params;
    const {userId}=req.body;
    const post=await postModel.findByPk(id);
    if(Number(post.userId)!==Number(userId)){
        res.status(400).json({message:"you are not the owner of this post"})
    }
    if(!post){
        res.status(404).json({message:"post not found"})
    }
    await post.destroy();
    res.status(200).json({message:"post deleted successfully"})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

//? 3. Retrieve all posts, including the details of the user who created each post and the associated comments. (Show
//? only for the post the “id, title”, and for user “id, name”, and for the comments “id, content”)

export const getAllPosts=async(req,res,next)=>{
    try{
      const posts= await postModel.findAll({
          attributes:["id","title"],
          include:[
            {
                model:userModel,
                attributes:["id","name"]
            },
            {
                model:commentModel,
                attributes:["id","content"]
            },

        ]
      })
      res.status(200).json({message:"get posts successfully",posts})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

//? 4. Retrieve all posts and count the number of comments associated with each post

export const getPostsWithCommentCount=async(req,res,next)=>{
    try{
      const posts= await postModel.findAll({
          attributes:["id","title",[Sequelize.fn("COUNT", Sequelize.col("Comments.id")), "commentsCount"]],
          include:[{
              model:commentModel,
              attributes:[]
          }],
          group:["post.id"]
      })
      res.status(200).json({message:"get posts successfully",posts})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}