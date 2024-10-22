import React, { useState, useEffect } from 'react';
import Order from './Order';
import Payment from './Payment';
const Menu = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [order, setOrder] = useState([]);
  const del = () => {
    setOrder([]);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-menu-9b5g.onrender.com/menu');
        const result = await response.json();
        console.log(result);
        setData(result);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
const add_to_order = (item) => {
  setOrder ([...order, {name: item.name, price: item.price}])
    }
  const dele = (index) => {
    const updatedOrder = order.filter((order, orderindex) => orderindex !== index )
    setOrder(updatedOrder)
  }
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <h3>{item.name} - ${item.price}</h3>
                <button onClick= {() => add_to_order(item)}>Agregar al carrito</button>
              </li>
            ))}
          </ul>
          <h1>Carrito:</h1>
          <Order order={order} del={del} dele = {dele}/>
        </div>
      )}
    </div>
  );
};

export default Menu;

