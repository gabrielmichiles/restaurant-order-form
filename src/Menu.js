import React from "react";

const Menu = (props) => {
  const { dishes } = props;

  // list of dishes with its full details
  return (
    <div className="menu">
      <h2>Menu</h2>
      <ul>
        {dishes.length == 0
          ? "Loading..."
          : dishes.map((dish) => (
              <li key={dish._id}>
                <div className="menu-item">
                  <div className="item-option">
                    <strong>{dish.name}</strong>
                    <br />
                    {dish.description}
                  </div>
                  <div className="item-price">${dish.price.toFixed(2)}</div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Menu;
