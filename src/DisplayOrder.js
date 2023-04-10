import React from "react";
import axios from "axios";
const { useState, useEffect } = React;

const DisplayOrder = (props) => {
  const { order } = props;

  // states to store current order and dishes
  const [orderedDishes, setOrderedDishes] = useState([]);
  const [currentOrder, setCurrentOrder] = useState();

  // gets the date order was created
  const getDate = () => {
    const date = new Date();

    return date.toLocaleDateString("en-CA", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
    // reference from (https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd/63490548#63490548) and (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)
  };

  // gets current order details and dishes
  useEffect(function getOrderedDishes() {
    axios
      .get(`/api/v1/orders/${order}`)
      .then((result) => {
        setCurrentOrder(result.data);
        setOrderedDishes(result.data.dishes);
      })
      .catch((error) => console.log(error));
  }, []);

  // order details
  return (
    <div className="displayed-order">
      <div className="order-number">
        <h2>Order #{order}</h2>
        <div className="order-date">{getDate()}</div>
      </div>
      <div className="order-details">
        <h3>Order Details:</h3>
        <ul>
          {orderedDishes.length == 0
            ? "Loading..."
            : orderedDishes.map((dish) => (
                <li key={dish._id}>
                  <div className="menu-item">
                    <div className="item-option">
                      <strong>{dish.name}</strong>
                    </div>
                    <div className="item-price">${dish.price.toFixed(2)}</div>
                  </div>
                </li>
              ))}
        </ul>
        <div className="order-total-price">
          <div className="item-option">
            <strong>Total:</strong>
          </div>
          <div className="item-price">
            <strong>
              {orderedDishes.length == 0
                ? "Loading..."
                : `$${currentOrder.total.toFixed(2)}`}
            </strong>
          </div>
        </div>
      </div>
      <div className="customer-details">
        <h3>Customer Details</h3>
        <div>
          {currentOrder == undefined ? (
            "Loading..."
          ) : (
            <>
              <p>{currentOrder.name}</p>
              <p>{currentOrder.address}</p>
              <p>{currentOrder.phone}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayOrder;
