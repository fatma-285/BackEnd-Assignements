import commentModel from "../../DB/models/comment.model.js"
import { Op } from "sequelize";
import userModel from "../../DB/models/user.model.js";
import postModel from "../../DB/models/post.model.js";

//? 1. Create a bulk of Comments. 
export const createComment = async (req, res, next) => {
    try {
        const comments = await commentModel.bulkCreate(req.body);
        res.status(201).json({ message: "comments created successfully", comments })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//? 2. Update the content of a specific comment by its ID. (Ensure that only the owner of the comment can perform this
//? action) (The user id that wants to perform this action will be given in the body).

export const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const comment = await commentModel.findByPk(id);
        if (Number(comment.userId) !== Number(userId)) {
            res.status(400).json({ message: "you are not the owner of this comment" })
        }
        await comment.update(req.body);
        res.status(200).json({ message: "comment updated successfully", comment })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//? 3. find a comment for a specific post, user, and content. If the comment exists, return it, otherwise, create a new
//? comment with the given details.

export const findOrCreateComment = async (req, res, next) => {
    try {
        const { userId, postId, content } = req.body;
        const comment = await commentModel.findOrCreate({ where: { userId, postId, content } })
        if (comment[1]) {
            return res.status(201).json({ message: "comment created successfully", comment: comment[0] })
        }
        res.status(200).json({ message: "comment found successfully", comment: comment[0] })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//? 4. Retrieve all comments that contain a specific word in their content and return the number of comments matched
//? (use find and count)

export const searchComment = async (req, res, next) => {
    try {
        const { title } = req.query;
        const comments = await commentModel.findAll({
            where: {
                content: {
                    [Op.like]: `%${title}%`,
                },
            },
        });
        res.status(200).json({ message: "get comments successfully", count: comments.length, comments })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//? 5.Retrieve the 3 most recent comments for a specific post, ordered by creation date. 

export const getNewestComments = async (req, res, next) => {
    try {
        const { id: postId } = req.params;
        const comments = await commentModel.findAll({
            where: {
                postId
            },
            order: [["createdAt", "DESC"]],
            limit: 3
        })
        res.status(200).json({ message: "get newest comments successfully", comments })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//? 6. Get Specific Comment By PK with User and Post Information. 

export const getCommentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await commentModel.findByPk(id, {
            attributes: ["id", "content"],
            include: [
                {
                    model: userModel,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: postModel,
                    attributes: ["id", "title", "content"]
                }
            ]
        },

        )
        if (!comment) {
            return res.status(404).json({ message: "comment not found" })
        }
        res.status(200).json({ message: "got comment details successfully", comment })
    } catch (error) {
        res.status(400).json({ message: error, error: error.message })
    }
}