const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
const port = process.env.PORT || 3001;

const postsRoutes = require("./routes/posts.routes");


app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/post", postsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, function() {
  console.log("Runnning on " + port);
});