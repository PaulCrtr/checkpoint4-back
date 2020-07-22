const recipeRouter = require("express").Router();
const db = require("../conf");

// GET ALL
recipeRouter.get("/", (_, res) => {
  db.query("select * from Recipe", (error, results) => {
    if (error) res.status(500).json({ status: "internal server error" });
    if (results.length) {
      res.status(200).json({ status: "success", results });
    } else {
      res.status(404).json({ status: "No recipe" });
    }
  });
});

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
