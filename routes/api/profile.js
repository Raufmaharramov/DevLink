const express = require("express");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const request = require("request");
const router = new express.Router();
const auth = require("../../middleware/auth");

router.get("/profile/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).send("No profile match");
    }
    res.send(profile);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/profile/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).send("Profile not found!");
    }
    res.send(profile);
  } catch (e) {
    if (e.kind == "ObjectId") {
      return res.status(400).send("Profile not found!");
    }
    res.status(500).send("server error");
  }
});

router.get("/profile", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.send(profiles);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/profile/me", auth, async (req, res) => {
  const profileFields = {};
  const { company, website, location, bio, status, githubusername, skills, facebook, instagram, twitter, linkedin, youtube } = req.body;

  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) profileFields.skills = skills.split(",").map(el => el.trim());

  profileFields.social = {};
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;
  if (twitter) profileFields.social.twitter = twitter;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (youtube) profileFields.social.youtube = youtube;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      profile = new Profile(profileFields);
      await profile.save();
      return res.send(profile);
    }

    profile = await Profile.findOneAndUpdate({ user: req.user._id }, { $set: profileFields }, { new: true });
    res.send(profile);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/profile", auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user._id });
    await User.findOneAndDelete({ _id: req.user._id });
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/profile/experience", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "company", "location", "from", "to", "current", "description"];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate("user", ["name", "avatar"]);

    profile.experience.push(req.body);
    await profile.save();
    res.send(profile);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/profile/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    const index = profile.experience.map(el => el.id).indexOf(req.params.exp_id);
    profile.experience.splice(index, 1);
    await profile.save();
    res.send(profile);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/profile/education", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["school", "degree", "fieldofstudy", "from", "to", "current", "description"];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate("user", ["name", "avatar"]);

    profile.education.push(req.body);
    await profile.save();
    res.send(profile);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/profile/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    const index = profile.education.map(el => el.id).indexOf(req.params.edu_id);
    profile.education.splice(index, 1);
    await profile.save();
    res.send(profile);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/profile/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).send({ error: "No github profile found!" });
      }
      res.send(JSON.parse(body));
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
