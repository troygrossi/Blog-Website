const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.post("/", (req, res) => {
  Post.create({
    post_title: req.body.post_title,
    post_content: req.body.post_content,
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

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["post_title", "post_content", "id"],
    include: [
      {
        model: User,
        attributes: ["username", "id"],
      },
      {
        model: Comment,
        attributes: ["comment_content"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
    ],
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
  Post.destroy({
    where: {
      id: req.body.post_id,
    },
  })
    .then((deletedPost) => {
      res.json(deletedPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
