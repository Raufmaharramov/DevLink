const express = require("express");
require("dotenv").config();
require("./db/mongoose");
const userRouter = require("./routes/api/users");
const profileRouter = require("./routes/api/profile");
const authRouter = require("./routes/api/auth");
const postRouter = require("./routes/api/posts");
const path = require("path");
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(postRouter);
app.use(profileRouter);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set the static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
