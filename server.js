const express = require("express");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const recipeRoute = require("./routes/recipeRoute");
const ingredientRoute = require("./routes/ingredientRoute");

app.use("/recipes", recipeRoute);
app.use("/ingredients", ingredientRoute);

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
