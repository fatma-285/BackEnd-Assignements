import userModel from "./user.model.js";
import postModel from "./post.model.js";
import commentModel from "./comment.model.js";

// user - post
userModel.hasMany(postModel,
    {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "userId"
    })
// user - comment
userModel.hasMany(commentModel,
    {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "userId"
    })
// post - user
postModel.belongsTo(userModel,
    {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "userId"
    })
// post - comment
postModel.hasMany(commentModel,
    {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "postId"
    })
// comment - user 
commentModel.belongsTo(userModel,
    {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "userId"
    })
// comment - post 
commentModel.belongsTo(postModel,
    {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "postId"
    })