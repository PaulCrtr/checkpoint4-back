const getOneRecipe = require("express").Router();
const db = require("../conf");

// GET ONE
getOneRecipe.get(
  "/:recipeId",
  (req, res, next) => {
    const recipeId = req.params.recipeId;
    db.query(
      "SELECT * from Recipe WHERE id_recipe = ?",
      recipeId,
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "internal server error" });
        } else if (result.length) {
          req.body.recipe = result;
          next();
        } else {
          res.status(404).json({ status: "No recipe" });
        }
      }
    );
  },
  (req, res, next) => {
    const recipeId = req.params.recipeId;
    db.query(
      "SELECT I.* FROM Ingredient AS I JOIN Ingredient_has_Recipe AS has ON has.Recipe_id_recipe = ? WHERE I.id_ingredient = has.Ingredient_id_ingredient",
      recipeId,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "internal server error" });
        } else if (results.length) {
          req.body.ingredients = results;
          next();
        } else {
          next();
        }
      }
    );
  },
  (req, res) => {
    const recipeId = req.params.recipeId;
    db.query(
      "SELECT content_instruction, order_instruction from Instruction WHERE Recipe_id_recipe = ?",
      recipeId,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "internal server error" });
        } else {
          if (results.length) {
            req.body.instructions = results;
          }
          res.status(200).json({
            status: "success",
            result: {
              recipe: req.body.recipe,
              ingredients: req.body.ingredients || null,
              instructions: req.body.instructions || null,
            },
          });
        }
      }
    );
  }
);

module.exports = getOneRecipe;
