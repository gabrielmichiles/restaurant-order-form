const router = require("express").Router({ mergeParams: true });
const { Order } = require("../models/Order");

// gets a list of all orders
router.get("/", (req, res) => {
  const orders = Order.find({})
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).send(error));
});

// gets a specific order by its ID
router.get("/:orderID", (req, res) => {
  Order.findOne({ _id: req.params.orderID })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).send(error));
});

// creates a new order
router.post("/", (req, res) => {
  const { name, phone, address, dishes } = req.body;

  let newOrder = new Order({
    name,
    phone,
    address,
    dishes,
  });

  newOrder
    .save()
    .then(() => res.status(201).json(newOrder))
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
