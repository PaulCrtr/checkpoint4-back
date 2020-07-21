const express = require("express");
const app = express();
const connection = require("./conf");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
