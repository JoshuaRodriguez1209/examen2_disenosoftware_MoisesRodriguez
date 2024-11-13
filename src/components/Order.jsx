import React, { useState, useEffect } from "react";
import Payment from "./Payment";

const Order = ({ order, del, dele, item, update_history,user}) => {
  const [total, setTotal] = useState(0);
  const delete_cart = () => {
    del();
  };

  useEffect(() => {
    const newTotal = order.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [order]);

  const increaseQuantity = (index) => {
    const updatedOrder = [...order];
    updatedOrder[index].quantity += 1;
    setTotal(total + updatedOrder[index].price);
  };

  const decreaseQuantity = (index) => {
    const updatedOrder = [...order];
    if (updatedOrder[index].quantity > 1) {
      updatedOrder[index].quantity -= 1;
    } else {
      dele(index);
    }
    setTotal(total - updatedOrder[index].price);
  };

  return (
    <div className="sticky top-5">
      <h1 className="text-2xl font-bold mb-4">Carrito:</h1>
      <ul className="space-y-4">
        {order.map((item, index) => (
         <li
         key={index}
         className="p-4 rounded-lg shadow-md bg-gray-50 flex flex-wrap justify-between items-start space-y-2 sm:space-y-0"
       >
         <div className="flex flex-col">
           <h3 className="font-semibold text-lg">
             {item.name}
           </h3>
           <div className="flex items-center space-x-2 mt-1">
             <span className="text-gray-700 font-semibold">${item.price}</span>
             <span className="bg-green-500 text-white rounded-full px-2 py-1 text-center">
               x {item.quantity}
             </span>
           </div>
         </div>
       
         <div className="flex items-center space-x-2 mt-2 sm:mt-0">
           <button
             className="bg-green-500 text-white h-10 w-10 rounded hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
             onClick={() => decreaseQuantity(index)}
           >
             -
           </button>
           <button
             className="bg-green-500 text-white h-10 w-10 rounded hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
             onClick={() => increaseQuantity(index)}
           >
             +
           </button>
           <button
             onClick={() => { dele(index) }}
             className="bg-red-500 text-white h-10 w-10 rounded hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
           >
             <svg
               stroke="currentColor"
               viewBox="0 0 24 24"
               fill="none"
               className="h-4 w-5"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                 strokeWidth="2"
                 strokeLinejoin="round"
                 strokeLinecap="round"
               ></path>
             </svg>
           </button>
         </div>
       </li>       
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-6">Total: ${total}</h2>
      <Payment total={total} delete_cart={delete_cart} order = {order} update_history= {update_history} user = {user}/>
      {item ? (
        <div>
          <p className="pt-10">{item.description}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Order;
