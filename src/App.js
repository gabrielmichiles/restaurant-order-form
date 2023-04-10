import React from "react";
import axios from "axios";
const { useState, useEffect } = React;

import OrderFormContainer from "./OrderFormContainer";
import DisplayOrder from "./DisplayOrder";

const App = (props) => {
  // state to store dishes to be used with children components
  const [dishes, setDishes] = useState([]);
  // state to store last order to be used with children components
  const [order, setOrder] = useState(null);

  // retrieves dishes from database and stores it to state
  useEffect(function getDishes() {
    axios
      .get("/api/v1/dishes")
      .then((result) => {
        setDishes(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // gets current order from submission
  const setCurrentOrder = (orderID) => {
    setOrder(orderID);
  };

  // main application
  return (
    <div className="wrapper">
      <div className="app">
        <h1>Restaurant Order</h1>
        {order == null ? (
          <OrderFormContainer
            dishes={dishes}
            order={order}
            currentOrder={setCurrentOrder}
          />
        ) : (
          <DisplayOrder order={order} />
        )}
      </div>
    </div>
  );
};

export default App;
