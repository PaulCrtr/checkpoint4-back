const recipeRouter = require("express").Router();
const db = require("../conf");

// GET ALL
recipeRouter.get("/", (_, res) => {
  db.query("SELECT * from Recipe", (error, results) => {
    if (error) res.status(500).json({ status: "internal server error" });
    if (results.length) {
      res.status(200).json({ status: "success", results });
    } else {
      res.status(404).json({ status: "No recipe" });
    }
  });
});

// GET ONE FULL
recipeRouter.get(
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

// POST ONE FULL
recipeRouter.post(
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
          // res.status(201).json({
          //   status: "success",
          //   recipeCreated: { id: results.insertId, ...req.body },
          // });
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

module.exports = recipeRouter;
