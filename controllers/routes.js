const router = require("express").Router();
const { User, Post, Comment } = require("../models");
// Navigation Routes
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["post_title", "post_content", "id"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["comment_content"],
      },
    ],
  })
    .then((response) => {
      const posts = response.map((post) => post.get({ plain: true }));
      res.render("home", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/post-view/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["post_title", "post_content", "id"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["comment_content"],
        include: [
          {
            model: User,
            attribute: ["username"],
          },
        ],
      },
    ],
  })
    .then((post) => {
      post = post.get({ plain: true });
      res.render("post-view", { post });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
