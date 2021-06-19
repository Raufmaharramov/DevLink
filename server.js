const express = require("express");
require("dotenv").config();
require("./db/mongoose");
const userRouter = require("./routes/api/users");
const profileRouter = require("./routes/api/profile");
const authRouter = require("./routes/api/auth");
const postRouter = require("./routes/api/posts");
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(postRouter);
app.use(profileRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
