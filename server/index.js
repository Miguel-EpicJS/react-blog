const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
const port = process.env.PORT || 3001;

const postsRoutes = require("./routes/posts.routes");
const usersRoutes = require("./routes/users.routes");
const postCommentsRoutes = require("./routes/post_comments.routes");


app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);
app.use("/post-comments", postCommentsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, function() {
  console.log("Runnning on " + port);
});
