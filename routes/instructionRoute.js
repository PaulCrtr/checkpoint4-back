const instructionRouter = require("express").Router();
const db = require("../conf");

// POST ONE
instructionRouter.post("/:recipeId", (req, res) => {
  const id = req.params.recipeId;
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
