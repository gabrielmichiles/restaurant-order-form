import React from "react";
import Menu from "./Menu";
import CreateOrder from "./CreateOrder";

const OrderContainer = (props) => {
  const { dishes, order, currentOrder } = props;

  // container for both menu and order form
  return (
    <div>
      <Menu dishes={dishes} />
      <CreateOrder dishes={dishes} order={order} currentOrder={currentOrder} />
    </div>
  );
};

export default OrderContainer;
