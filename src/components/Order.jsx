import React, { useState, useEffect } from "react";
import Payment from "./Payment";

const Order = ({ order, del, dele, item}) => {
  const [total, setTotal] = useState(0);

  const delete_cart = () => {
    del()
  };

  useEffect(() => {
    const newTotal = order.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
    setTotal(newTotal);
  }, [order])

  const increaseQuantity = (index) => {
    const updatedOrder = [...order]
    updatedOrder[index].quantity += 1;
    setTotal(total + updatedOrder[index].price)
  };

  const decreaseQuantity = (index) => {
    const updatedOrder = [...order]
    if (updatedOrder[index].quantity > 1) {
      updatedOrder[index].quantity -= 1
    } else {
      dele(index)
    }
    setTotal(total - updatedOrder[index].price)
  }
  return (
    <div>      
      <ul className="space-y-4">
        {order.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <h3 className="font-semibold">
              {item.name} - ${item.price} x {item.quantity}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition-colors duration-300"
                onClick={() => decreaseQuantity(index)}
              >
                -
              </button>
              <button
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-yellow-700 transition-colors duration-300"
                onClick={() => increaseQuantity(index)}
              >
                +
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-colors duration-300"
                onClick={() => dele(index)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-6">Total: ${total}</h2>
      <Payment total={total} delete_cart={delete_cart} />
      {item ?
      <div>
          <p className="pt-10">{item.description}</p>
      </div>
    : null
    }   
      </div>
  );
};

export default Order;
