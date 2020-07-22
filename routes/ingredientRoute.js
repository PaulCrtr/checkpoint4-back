const ingredientRouter = require("express").Router();
const db = require("../conf");

// GET ALL
ingredientRouter.get("/", (_, res) => {
  db.query("select * from Ingredient", (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: "internal server error" });
    } else if (results.length) {
      res.status(200).json({ status: "success", results });
    } else {
      res.status(404).json({ status: "No ingredient" });
    }
  });
});

module.exports = ingredientRouter;
