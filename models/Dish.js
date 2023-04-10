const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DishSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    maxLength: [100, "Name is too long."],
    minLength: [2, "Name is too short."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    maxLength: [140, "Description is too long"],
    minLength: [2, "Description is too short"],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
    match: [/^[1-9]\d{0,3}(?:\.\d{1,2})?$/, "Invalid price."],
    // reference from (https://stackoverflow.com/questions/70531231/regular-expression-for-accepting-integers-decimal-values-and-limiting-by-maximu);
    min: [1, "Minimum price is 1."],
    max: [999.99, "Maximum price is 999.99."],
  },
});

const Dish = mongoose.model("Dish", DishSchema);

module.exports = { Dish, DishSchema };
