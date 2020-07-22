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
      "SELECT I.* FROM Ingredient AS I JOIN Ingredient_has_Recipe AS has ON has.Recipe_id_recipe = ?",
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

// POST ONE
recipeRouter.post("/", (req, res) => {
  const { name_recipe } = req.body;
  if (name_recipe) {
    db.query("INSERT INTO Recipe SET ?", req.body, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: "internal server error" });
      } else {
        res.status(201).json({
          status: "success",
          recipeCreated: { id: results.insertId, ...req.body },
        });
      }
    });
  } else {
    res.status(422).json({
      status: "error",
      status: "required field(s) missing",
    });
  }
});

module.exports = recipeRouter;
