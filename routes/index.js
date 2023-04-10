const router = require("express").Router({ mergeParams: true });
const dishes = require("./dishes");
const orders = require("./orders");

// implements the use of dishes routes and controllers
router.use("/api/v1/dishes/", dishes);

// implements the use of orders routes and controllers
router.use("/api/v1/orders/", orders);

// creates a route to redirect user in case a requested resource doesn't exist
router.get("/*", (req, res) => {
  res.status(404).send("Requested resource doesn't exist.");
});
router.post("/*", (req, res) => {
  res.status(404).send("Requested resource doesn't exist.");
});

module.exports = router;
