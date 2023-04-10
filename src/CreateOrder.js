import React from "react";
import axios from "axios";
const { useState } = React;

const CreateOrder = (props) => {
  const { dishes, currentOrder } = props;

  // states to handle form inputs and form validation
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [chosenDishes, setChosenDishes] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  // checks how many dishes are checked
  const handleCheckedDishes = (event) => {
    const dishID = event.target.value;
    const checked = event.target.checked;

    if (checked) setChosenDishes([...chosenDishes, dishID]);
    // reference from (https://stackoverflow.com/a/54069332)
    else {
      // removes unchecked dishes from the array. if all dishes were unchecked, returns empty array
      if (chosenDishes.length == 1 && chosenDishes[0]) setChosenDishes([]);
      else setChosenDishes(chosenDishes.filter((dish) => dish != dishID));
    }
  };

  // renders error message in case of validation error
  const displayValidationErrors = (errorType) => {
    return errorMessage.findIndex(({ type }) => type == errorType) >= 0 ? (
      <div className="validation-error">
        {
          errorMessage[errorMessage.findIndex(({ type }) => type == errorType)]
            .message
        }
      </div>
    ) : null;
  };

  // handles form submission
  const submitOrder = async (event) => {
    event.preventDefault();

    // stores all chosen dishes as promises to be used with Promise.all method
    const promises = chosenDishes.map((dishId) => {
      return axios.get(`/api/v1/dishes/${dishId}`).then((response) => {
        return response.data;
      });
    });

    // waits for all promises to be fulfilled then stores all chosen dishes to create a new order
    const orderDishes = await Promise.all(promises);
    // reference from (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

    let newOrder = {
      name: name,
      phone: phone,
      address: address,
      dishes: orderDishes,
    };

    // stores validation error messages
    let errMessage = [];

    // creates a new order if all inputs are valid, otherwise retrieves which inputs are invalid to be rendered on the form
    axios
      .post("/api/v1/orders", newOrder)
      .then((result) => currentOrder(result.data._id))
      .catch((error) => {
        let errors = error.response.data.errors;

        if (errors.hasOwnProperty("name")) {
          errMessage.push({ type: "name", message: errors.name.message });
        }
        if (errors.hasOwnProperty("phone")) {
          errMessage.push({ type: "phone", message: errors.phone.message });
        }
        if (errors.hasOwnProperty("address")) {
          errMessage.push({ type: "address", message: errors.address.message });
        }
        if (errors.hasOwnProperty("dishes")) {
          errMessage.push({ type: "dishes", message: errors.dishes.message });
        }
      })
      .finally(() => {
        setErrorMessage(errMessage);
      });
    // reference from (https://blog.openreplay.com/integrating-axios-with-react-hooks/)
  };

  // order form with client-side validation
  return (
    <div className="order-form">
      <h2>Order Now</h2>

      <form onSubmit={submitOrder}>
        <label>
          <span>Name:</span>
          <input
            type="text"
            id="form-name"
            placeholder="Full Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        {displayValidationErrors("name")}

        <label>
          <span>Phone:</span>
          <input
            type="text"
            id="form-phone"
            placeholder="(XXX) XXX-XXXX"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>
        {displayValidationErrors("phone")}

        <label>
          <span>Address:</span>
          <input
            type="text"
            id="form-address"
            placeholder="Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        {displayValidationErrors("address")}

        <label>
          <span>Dishes:</span>
          <ul>
            {dishes.length == 0
              ? "Loading..."
              : dishes.map((dish) => (
                  <li key={dish._id}>
                    <input
                      type="checkbox"
                      name="dishes"
                      value={dish._id}
                      onChange={handleCheckedDishes}
                    />
                    <span>
                      {dish.name} - ${dish.price.toFixed(2)}
                    </span>
                  </li>
                ))}
          </ul>
        </label>
        {displayValidationErrors("dishes")}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateOrder;
