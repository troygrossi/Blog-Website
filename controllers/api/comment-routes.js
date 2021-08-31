const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.post("/", (req, res) => {
  Comment.create({
    comment_content: req.body.comment_content,
    post_id: req.body.post_id,
    user_id: req.body.user_id,
  })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/", (req, res) => {
  Comment.destroy({
    where: {
      id: req.body.comment_id,
    },
  }).then((comment) => {
    console.log("Comment Deleted");
    res.json(comment);
  });
});

module.exports = router;
