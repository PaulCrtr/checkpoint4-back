const deleteOneRecipe = require("express").Router();
const db = require("../conf");

// DELETE ONE
deleteOneRecipe.delete(
  "/:recipeId",
  (req, res, next) => {
    const id = req.params.recipeId;
    db.query(
      "DELETE FROM Instruction WHERE Recipe_id_recipe = ?",
      id,
      (error, _) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "internal server error" });
        }
        next();
      }
    );
  },
  (req, res, next) => {
    const id = req.params.recipeId;
    db.query(
      "DELETE FROM Ingredient_has_Recipe WHERE Recipe_id_recipe = ?",
      id,
      (error, _) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "internal server error" });
        }
        next();
      }
    );
  },
  (req, res) => {
    const id = req.params.recipeId;
    db.query("DELETE FROM Recipe WHERE id_recipe = ?", id, (error, _) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: "internal server error" });
      } else {
        res.status(200).send("success");
      }
    });
  }
);

module.exports = deleteOneRecipe;
