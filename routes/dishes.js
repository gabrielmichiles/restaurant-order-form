const router = require("express").Router({ mergeParams: true });
const dishesControllers = require("../controllers/dishControllers");

// route to retrieve a list of all dishes
router.get("/", dishesControllers);
// route to retrieve a specific dish by its ID
router.get("/:dishId", dishesControllers);
// route to create a new dish
router.post("/", dishesControllers);

module.exports = router;
