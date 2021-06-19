const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const auth = require("../../middleware/auth");
const { post } = require("request");

router.post("/post", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // or this could be added  .select("-password");
    const newPost = new Post({
      text: req.body.text,
      user: req.user.id,
      avatar: user.avatar,
      name: user.name
    });
    const post = await newPost.save();
    res.send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/post", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      res.status(401).send("No post found!");
    }
    res.send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/post/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(401).send("No post found!");
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/post/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send("No post found!");
    }

    if (post.user.toString() !== req.user.id) {
      res.status(401).send("Authentication failed!");
    }
    await post.remove();
    res.send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/post/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).send("Post has already been liked!");
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.send(post.likes);
  } catch (error) {
    res.status(500).send();
  }
});

router.put("/post/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).send("Post has not been liked yet!");
    }
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.send(post.likes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/post/comment/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);

    const comment = {
      text: req.body.text,
      user: req.user.id,
      avatar: user.avatar,
      name: user.name
    };
    post.comments.unshift(comment);
    await post.save();
    res.send(post.comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/post/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(el => el.id === req.params.comment_id);
    if (!comment) {
      return res.status(404).send("Comment not found!");
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send("User not authorized!");
    }

    const removeIndex = post.comments.map(el => el.user.toString()).indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.send(post.comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
