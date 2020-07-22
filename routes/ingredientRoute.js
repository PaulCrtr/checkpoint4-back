const ingredientRouter = require("express").Router();
const db = require("../conf");

// GET ALL
ingredientRouter.get("/", (_, res) => {
  db.query("select * from Ingredient", (error, results) => {
    if (error) res.status(500).json({ status: "internal server error" });
    if (results.length) {
      res.status(200).json({ status: "success", results });
    } else {
      res.status(404).json({ status: "No ingredient" });
    }
  });
});

// POST ONE
ingredientRouter.post("/", (req, res) => {
  const { name_ingredient } = req.body;
  if (name_ingredient) {
    db.query("INSERT INTO Ingredient SET ?", req.body, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: "internal server error" });
      } else {
        res.status(201).json({
          status: "success",
          ingredientCreated: { id: results.insertId, ...req.body },
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

module.exports = ingredientRouter;
