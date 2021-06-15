const express = require("express");
require("dotenv").config();
require("./db/mongoose");
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
