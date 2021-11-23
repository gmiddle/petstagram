const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { Comment, User } = require("../../db/models");

router.get("/getAll/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const comments = await Comment.findAll({
        where: {postId: id}
    });
    return res.json(comments);
  })
);

router.get("/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    return res.json(comment);
  })
);

// // get comments for postCard modal
// router.get("/postCard/:id",
//   asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const comments = await Comment.findAll({ 
//       where: {postId: id} 
//     })
//     console.log("this is comments from posts api route", comments)
//     return res.json(comments);
//   })
// );

router.post("/",
  asyncHandler(async (req, res) => {
    const comment = await Comment.create(req.body);
    return res.json(comment);
  })
);

router.put("/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    await comment.update(req.body);
    return res.json(comment);
  })
);

router.delete("/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    
    if (!comment) throw new Error("Cannot find comment");
    await comment.destroy(req.body);
   
    return res.json({ id });
  })
);

module.exports = router;
