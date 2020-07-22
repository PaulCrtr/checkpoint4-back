const instructionRouter = require("express").Router();
const db = require("../conf");

// GET ALL
instructionRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "select * from Instruction WHERE Recipe_id_recipe = ?",
    id,
    (error, results) => {
      if (error) res.status(500).json({ status: "internal server error" });
      if (results.length) {
        res.status(200).json({ status: "success", results });
      } else {
        res.status(404).json({ status: "No instruction" });
      }
    }
  );
});

// POST ONE
instructionRouter.post("/:id", (req, res) => {
  const id = req.params.id;
  const { content_instruction, order_instruction } = req.body;
  req.body.Recipe_id_recipe = id;
  if (content_instruction && order_instruction) {
    db.query("INSERT INTO Instruction SET ?", req.body, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: "internal server error" });
      } else {
        res.status(201).json({
          status: "success",
          instructionCreated: { id: results.insertId, ...req.body },
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

module.exports = instructionRouter;
