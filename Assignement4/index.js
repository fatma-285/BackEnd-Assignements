//* -------------------------------------------------------------------------- */
//*                Part1:Simple CRUD Operations Using Express.js:              */
//* -------------------------------------------------------------------------- */

const express=require ("express");
const app=express();
const {readFileSync,writeFileSync}=require("fs");
const {resolve}=require("node:path")
let port=3000;

let users=JSON.parse(readFileSync("./users.json","utf-8"))

app.use(express.json());

app.get("/",(req,res,next)=>{
return res.status(200).send({message:"Hello to my server",statusCode:200});
})

//? 1-Add User
app.post("/users",(req,res,next)=>{
    const{email,name,age}=req.body;
    const isExist = users.find((user) => user.email === email);
    if(isExist){
       return res.status(409).send({message:`${email} Already Exist..`,statusCode:409})  
    }
    let id=users.length+1
    users.push({id,name,email,age})
    writeFileSync("./users.json",JSON.stringify(users))
    res.status(201).send({message:`${email} Added Successfully`,statusCode:201});
})

//? 2-Updat User
app.patch("/users/:id",(req,res,next)=>{
    const {id}=req.params;

    const user=users.find((user)=> user.id==id)
    if(!user){
       return res.status(404).send({message:`User with id ${id} Not Found`,statusCode:404})
    }

    if(req.body.email){
        const isExist = users.find((u) => u.email === req.body.email && u.id!=user.id);
        if(isExist){
           return res.status(409).send({message:`${req.body.email} Already Exist..`,statusCode:409})
        }
    }

    user.name=req.body.name??user.name;
    user.email=req.body.email??user.email;
    user.age=req.body.age??user.age;

    writeFileSync("./users.json",JSON.stringify(users))
    return res.status(200).send({message:`User with id ${id} Updated Successfully`,statusCode:200});
})

//? 3-Delete User
app.delete("/users{/:id}",(req,res,next)=>{
    const id=req.params.id??req.body.id??req.query.id;
    const userIndex=users.findIndex((u)=> u.id == id)
    if(userIndex == -1){
       return res.status(404).send({message:`User with id ${id} Not Found`,statusCode:404})
    }
    users.splice(userIndex,1);
    writeFileSync("./users.json",JSON.stringify(users))
    return res.status(201).send({message:`User with id ${id} deleted Successfully`,statusCode:201});
})

//? 4-Get User by name
app.get("/user",(req,res,next)=>{
    const {name}=req.query;
    console.log({name});
    const user=users.find((u)=> u.name==name)
    console.log({user});
    if(!user){
       return res.status(404).send({message:`${name} not found`,statusCode:404})
    }
    return res.status(200).send({message:"User Fetched Successfully",statusCode:200,data:user})
})

//? 5- Get All Users 
app.get("/users",(req,res)=>{
   return res.status(200).send({message:"All Users Fetched Successfully",statusCode:200,data:users});
})

//? 6-filter by min age
app.get("/users/filter",(req,res,next)=>{
    const minAge =Number(req.query.minAge);
    const filtered=users.filter((u)=>u.age>=minAge);
    if(filtered.length==0){
       return res.status(404).send({message:`No user found with age greater than ${minAge}`,statusCode:404})
    }
    console.log({filtered});
    return res.status(200).send({message:`Users filtered by min age ${minAge} successfully`,statusCode:200,data:filtered})
})

//? 7-Get User by id
app.get("/users/:id",(req,res,next)=>{
    const {id}=req.params;
    const user=users.find((u)=> u.id==id);
    if(!user){
       return res.status(404).send({message:`User with id ${id} Not Found`,statusCode:404})
    }
    return res.status(200).send({message:"User Fetched Successfully",statusCode:200,data:user});
})

//? Page Not Found
app.use((req,res,next)=>{
return res.status(404).send({message:"Not Found",statusCode:404});
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})