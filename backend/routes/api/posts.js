const express = require("express");
const asyncHandler = require("express-async-handler");
const { post } = require(".");
const router = express.Router();
const {Post} = require("../../db/models")

router.get("/",
    asyncHandler(async (req, res) => {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                },
            ]
        });
        return res.json(posts)
    })
)