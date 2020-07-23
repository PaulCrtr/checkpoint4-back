const getAllRecipes = require("express").Router();
const db = require("../conf");

// GET ALL
getAllRecipes.get("/", (_, res) => {
  db.query("SELECT * from Recipe", (error, results) => {
    if (error) res.status(500).json({ status: "internal server error" });
    if (results.length) {
      res.status(200).json({ status: "success", results });
    } else {
      res.status(404).json({ status: "No recipe" });
    }
  });
});

module.exports = getAllRecipes;
