const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const getOneRecipe = require("./routes/getOneRecipe");
const postRecipe = require("./routes/postRecipe");
const getAllRecipes = require("./routes/getAllRecipes");
const ingredientRoute = require("./routes/ingredientRoute");

app.use("/recipes", getOneRecipe);
app.use("/recipes", postRecipe);
app.use("/recipes", getAllRecipes);
app.use("/ingredients", ingredientRoute);

app.listen(8000, () => {
  console.log("APP listening on port 8000!");
});
