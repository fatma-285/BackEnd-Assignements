
 import userModel from "../../DB/models/user.model.js"
//? 1. Create a new user (using build and save) (make sure that the email does not exist before) (Don’t forget to Handle validation errors)

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        const isExist = await userModel.findOne({ where: { email } })
        if (isExist) {
            res.status(400).json({ message: "email already exist" })
        }
        const user = userModel.build({ name, email, password })
        await user.save();
        res.status(201).json({ message: "user created successfully", user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//? 2. Create or update based on PK and use skip validation option

export const createOrUpdateUser=async(req,res,next)=>{
    const {name,email,password,role}=req.body
    try {
        const {id}=req.params;
        const [user,created]=await userModel.upsert(
            {id,name,email,password,role},
            {
                returning:true,
                validate:false
            }
        )
        if(created){
            res.status(201).json({message:"user created successfully",user})
        }else{
            res.status(200).json({message:"user updated successfully",user})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//? 3. Write an API endpoint to find a user by their email address.

export const findByEmail=async(req,res,next)=>{
    const {email}=req.query
    try {
        const user=await userModel.findOne({where:{email}})
        if(!user){
            res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user found successfully",user})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//? 4. Retrieve a user by their PK, excluding the “role” field from the response.

export const getUserById=async(req,res,next)=>{
    const {id}=req.params
    try {
        const user=await userModel.findByPk(id,{attributes:{exclude:["role"]}})
        if(!user){
            res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user found successfully",user})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}