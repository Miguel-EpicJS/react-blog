const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

require("./routes/posts.routes")(app);

app.listen(port, function() {
  console.log("Runnning on " + port);
});
