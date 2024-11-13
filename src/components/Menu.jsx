// Menu.js
import React, { useState, useEffect } from "react";
import Order from "./Order";
import { getMenu } from "../services/menuApi";

const Menu = ({ update_history, user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [item, setItem] = useState(null);
  const del = () => {
    setOrder([]);
  };

  useEffect(() => {
    getMenu()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const add_to_order = (item) => {
    const existingItemIndex = order.findIndex(
      (orderItem) => orderItem.name === item.name
    );

    if (existingItemIndex !== -1) {
      const updatedOrder = [...order];
      updatedOrder[existingItemIndex].quantity += 1;
      setOrder(updatedOrder);
    } else {
      setOrder([...order, { name: item.name, price: item.price, quantity: 1 }]);
    }
  };

  const dele = (index) => {
    const updatedOrder = order.filter((_, orderIndex) => orderIndex !== index);
    setOrder(updatedOrder);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full justify-between items-start">
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <p className="text-center text-gray-700 font-bold text-3xl">
            Cargando menú...
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-full lg:w-10/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-gray-200 transition-colors duration-300"
                onMouseEnter={() => setItem(item)}
                onMouseLeave={() => setItem(null)}
              >
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-4">${item.price}</p>
                <button
                  onClick={() => { add_to_order(item) }}
                  className="font-sans flex justify-center gap-2 items-center mx-auto  text-base text-wrap text-gray-500 bg-white-300 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-0 px-4 py-2 overflow-hidden  rounded-full group"
                >
                  Agregar al carrito
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 19"
                    className="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full  group-hover:border-none p-2 rotate-45"
                  >
                    <path
                      className="fill-gray-800 group-hover:fill-gray-800"
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-5/12 mt-6 lg:mt-0 lg:pl-6">
            <Order order={order} del={del} dele={dele} item={item} update_history={update_history} user = {user} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
