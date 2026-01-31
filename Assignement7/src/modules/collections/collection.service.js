import { db } from "../../DB/connectionDB.js";

//? 1- Create an explicit collection named “books” with a validation rule to ensure that each
//? document has a non-empty “title” field.

export const createBookCollection = async (req, res) => {
    try {
        const collections = await db.listCollections({ name: "books" }).toArray();
        if (collections.length === 0) {
            await db.createCollection("books", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["title"],
                        properties: {
                            title: {
                                bsonType: "string",
                                minLength: 1,
                            },
                        },
                    },
                },
            });

            res.status(201).json({ message: "books Collection created successfully" });
        } else {
            res.status(400).json({ message: "books Collection already exists" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//? 2- Create an implicit collection by inserting data directly into a new collection named
//? “authors”.

export const createAuthorCollection = async (req, res) => {
    try {
        const collections = await db.listCollections({ name: "authors" }).toArray();
        if (collections.length === 0) {
            await db.collection("authors").insertOne({ name: "author1", nationality: "British" });
            res.status(201).json({ message: "authors Collection created successfully" });
        } else {
            res.status(400).json({ message: "authors Collection already exists" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//? 3- Create a capped collection named “logs” with a size limit of 1MB.

export const createLogCollection=async(req,res,next)=>{
    try {
        const collections=await db.listCollections({name:"logs"}).toArray();
        if(collections.length===0){
            await db.createCollection("logs",{
                capped:true,
                size:1024*1024,
            })
            res.status(201).json({message:"logs Collection created successfully"});
        }else{
            res.status(400).json({message:"logs Collection already exists"});
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//? 4-Create an index on the books collection for the title field.

export const createBookIndex=async(req,res,next)=>{
    try {
        const collection=await db.listCollections({name:"books"}).toArray();
        if(collection.length>0){
            await db.collection("books").createIndex({title:1});
            res.status(201).json({message:"index created successfully"});
        }else{
            res.status(400).json({message:"books Collection does not exist"});
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}