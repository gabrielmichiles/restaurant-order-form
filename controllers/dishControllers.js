const router = require("express").Router({ mergeParams: true });
const { Dish } = require("../models/Dish");

// gets a list of all dishes
router.get("/", (req, res) => {
  const dishes = Dish.find({})
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).send(error));
});

// gets a specific dish by its ID
router.get("/:dishID", (req, res) => {
  Dish.findOne({ _id: req.params.dishID })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).send(error));
});

// creates a new dish
router.post("/", (req, res) => {
  const { name, description, price } = req.body;

  let newDish = new Dish({
    name,
    description,
    price,
  });

  newDish
    .save()
    .then(() => res.status(201).json(newDish))
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
