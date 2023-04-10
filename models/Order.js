const mongoose = require("mongoose");
const { DishSchema } = require("./Dish");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    maxLength: [100, "Name is too long."],
    minLength: [2, "Name is too short."],
  },
  phone: {
    type: String,
    required: [true, "Phone is required."],
    match: [
      /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Invalid phone number.",
    ],
    // reference from ("https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number")
    maxLength: [25, "Phone is too long."],
    minLength: [10, "Phone is too short."],
  },
  address: {
    type: String,
    required: [true, "Address is required."],
    maxLength: [140, "Address is too long."],
    minLength: [5, "Address is too short."],
  },
  dishes: {
    type: [DishSchema],
    required: [true, "At least one dish is required."],
    // validates that array won't be empty
    validate: [
      (v) => v == null || v.length > 0,
      "At least one dish is required.",
    ],
    // reference from (https://github.com/Automattic/mongoose/issues/5139#issuecomment-429990002) and (https://mongoosejs.com/docs/validation.html#custom-error-messages)
  },
  total: {
    type: Number,
  },
});

// sums dishes prices and stores it into 'total' property before saving object
OrderSchema.pre("save", function (next) {
  let total = 0;

  this.dishes.map((dish) => (total += dish.price));

  this.total = total;

  next();
});
// reference from (https://mongoosejs.com/docs/middleware.html#pre) and (https://medium.com/@justinmanalad/pre-save-hooks-in-mongoose-js-cf1c0959dba2)

const Order = mongoose.model("Order", OrderSchema);

module.exports = {
  Order,
};
