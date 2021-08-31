const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: ["id", "username"],
    include: [
      {
        model: Post,
        attributes: ["post_title", "id"],
      },
      {
        model: Comment,
        attributes: ["comment_content", "post_id"],
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/posts", (req, res) => {
  User.findAll({
    attributes: ["id", "username"],
    include: [
      {
        model: Post,
        attributes: ["post_content"],
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/profile", (req, res) => {
  const loggedIn = req.session.loggedIn;

  if (loggedIn) {
    User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: ["id", "username"],
    })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.json(false);
  }
});

// Login Routes

// Create User
router.post("/", (req, res) => {
  User.create({
    username: req.body.usernameSignup,
    password: req.body.passwordSignup,
  })
    .then((user) => {
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.json(user);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.usernameLogin,
      password: req.body.passwordLogin,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: "No user with that username" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.json({ user, message: "You are now logged in" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
