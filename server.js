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
const instructionRoute = require("./routes/instructionRoute");
const ingregredientHasRecipeRoute = require("./routes/ingredientHasRecipeRoute");

app.use("/recipes", recipeRoute);
app.use("/ingredients", ingredientRoute);
app.use("/instructions", instructionRoute);
app.use("/ingredientHasRecipe", ingregredientHasRecipeRoute);

app.listen(8000, () => {
  console.log("APP listening on port 8000!");
});
