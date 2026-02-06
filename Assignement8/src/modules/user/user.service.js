import { User } from "../../DB/models/user.model.js";

// ? 1. Signup (make sure that the email does not exist before) (Don’t forget to hash the password and encrypt the phone)

export const createUser=async(req,res,next)=>{
    try{
        const {name,email,password,phone,age}=req.body;
        if(await User.findOne({email})){
            return res.status(400).json({message:"email already exist"});
        }
        const user= new User({name,email,password,phone,age});        
        await user.save();
        res.status(201).json({message:"user created successfully",user});
    }catch(err){
        res.status(500).json({message:"something went wrong",error:err.message});
    }
}

//? 2. Create an API for authenticating users (Login) and return a JSON Web Token (JWT) that contains the userId and will expireafter “1 hour”. (Get the email and the password from the body)

export const loginUser=async(req,res,next)=>{
    try{
      const {email,password}=req.body;
      const user=await User.findOne({email});
      if(!user){
          return res.status(400).json({message:"user not found"});
      }
      if(user.password!==password){
        return res.status(400).json({message:"invalid email or password"});
      }
      res.status(200).json({message:"user logged in successfully",user});
    }catch(err){
        res.status(500).json({message:"something went wrong",error:err.message});
    }
}

//? Update logged-in user information (Except Password). (If user want to update the email, check the newemail
//? doesn’t exist before. (Get the id for the logged-in user (userId) from the token not the body) (send the tokenintheheaders)

export const updateUser=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const {name,email,age,phone}=req.body;
        const user= await User.findById(id,{password:0});
        if(!user){
            return res.status(400).json({message:`user with id ${id} not found`});
        }
        user.name=name?name:user.name;
        user.email=email?email:user.email;
        user.age=age?age:user.age;
        user.phone=phone?phone:user.phone;
        if(await User.findOne({email})){
            return res.status(400).json({message:`email ${email} is already exist`});
        }
        await user.save();
        res.status(200).json({message:`user with id ${id} updated successfully`,user});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:error.message});
    }
}

//? 4. Delete logged-in user. (Get the id for the logged-in user (userId) from the token not the body) (send the tokeninthe headers)

export const deleteUser=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const user=await User.findByIdAndDelete(id);
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        res.status(200).json({message:`user with id ${id} deleted successfully`});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:err.message});
    }
}

//? 5. Get logged-in user data by his ID. (Get the id for the logged-in user (userId) from the token not the body) (sendthetoken in the headers) 

export const getUser=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const user=await User.findById(id,{
            password:0,
        });
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        res.status(200).json({message:`user with id ${id} fetched successfully`,user});
    } catch (error) {
        res.status(500).json({message:"something went wrong",error:err.message});
    }
}