const postRecipe = require("express").Router();
const db = require("../conf");

// POST ONE
postRecipe.post(
  "/",
  (req, res, next) => {
    const {
      name_recipe,
      time_recipe,
      number_recipe,
      image,
      author,
      ingredients,
      instructions,
    } = req.body;
    if (
      name_recipe &&
      time_recipe &&
      number_recipe &&
      author &&
      ingredients &&
      instructions
    ) {
      const data = { name_recipe, time_recipe, number_recipe, image, author };
      db.query("INSERT INTO Recipe SET ?", data, (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "internal server error" });
        } else {
          req.body.recipeCreated = { id: results.insertId, ...data };
          next();
        }
      });
    } else {
      res.status(422).json({
        status: "error",
        status: "required field(s) missing",
      });
    }
  },
  (req, res, next) => {
    const data = [...req.body.instructions].map((element) => [
      ...element,
      req.body.recipeCreated.id,
    ]);
    db.query(
      "INSERT INTO Instruction (content_instruction, order_instruction, Recipe_id_recipe) VALUES ?",
      [data],
      (error, _) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "internal server error" });
        } else {
          req.body.recipeCreated = {
            ...req.body.recipeCreated,
            instructions: data,
          };
          next();
        }
      }
    );
  },
  (req, res, next) => {
    const data = req.body.ingredients;
    db.query(
      "INSERT INTO Ingredient (name_ingredient) VALUES ?",
      [data],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "internal server error" });
        } else {
          const ingredientsHasRecipe = [...data].map((e, i) => {
            return [req.body.recipeCreated.id, i + results.insertId];
          });
          req.body.recipeCreated = {
            ...req.body.recipeCreated,
            ...data,
            ingredientsHasRecipe,
          };
          next();
        }
      }
    );
  },
  (req, res) => {
    const data = req.body.recipeCreated.ingredientsHasRecipe;
    db.query(
      "INSERT INTO Ingredient_has_Recipe (Recipe_id_recipe, Ingredient_id_ingredient) VALUES ?",
      [data],
      (error, _) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "internal server error" });
        } else {
          res.status(201).json({
            status: "success",
            recipeCreated: req.body.recipeCreated,
          });
        }
      }
    );
  }
);

module.exports = postRecipe;
