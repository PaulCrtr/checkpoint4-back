const ingredientHasRecipeRouter = require("express").Router();
const db = require("../conf");

// POST ONE
ingredientHasRecipeRouter.post("/:recipeId", (req, res) => {
  const { Ingredient_id_ingredient } = req.body;
  const recipeId = req.params.recipeId;
  req.body.Recipe_id_recipe = recipeId;
  if (Ingredient_id_ingredient && recipeId) {
    db.query(
      "INSERT INTO Ingredient_has_Recipe SET ?",
      req.body,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "internal server error" });
        } else {
          res.status(201).json({
            status: "success",
            ingredientHasRecipeCreated: { id: results.insertId, ...req.body },
          });
        }
      }
    );
  } else {
    res.status(422).json({
      status: "error",
      status: "required field(s) missing",
    });
  }
});

module.exports = ingredientHasRecipeRouter;
