const router = require("express").Router({ mergeParams: true });
const orderControllers = require("../controllers/orderControllers");

// route to retrieve a list of all orders
router.get("/", orderControllers);
// route to retrieve a specific order by its ID
router.get("/:orderID", orderControllers);
// route to create a new order
router.post("/", orderControllers);

module.exports = router;
