import React, { useState, useEffect } from "react";
import Order from "./Order";
import { getMenu } from "../services/menuApi";

const Menu = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [item,setItem] = useState(null);

  const del = () => {
    setOrder([]);
  };

  useEffect(() => {
    getMenu()
    .then((data) => {
      setData(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

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
    <div className="flex justify-between p-6">
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <p className="text-center text-gray-700 font-bold text-3xl">
            Cargando menú...
          </p>
        </div>
      ) : (
        <div className="flex w-full">
          <div className="w-8/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-gray-200 transition-colors duration-300"
  onMouseEnter={() => setItem(item)} onMouseLeave={() => setItem(null)}
              >
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-4">${item.price}</p>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
                  onClick={() => add_to_order(item)}
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>

          <div className="w-4/12 pl-6">
            <h1 className="text-2xl font-bold mb-4">Carrito:</h1>
            <Order order={order} del={del} dele={dele} item = {item} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
