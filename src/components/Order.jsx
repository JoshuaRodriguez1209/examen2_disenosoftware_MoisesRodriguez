import React, { useState, useEffect } from 'react';
import Payment from './Payment';

const Order = ({order,del}) => {
  const [total, setTotal] = useState(0);


  const delete_cart = () => {
    del();
  };

  useEffect(() => {
    const newTotal = order.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
  }, [order]);

  return (
    <div>
      <ul>
        {order.map((item) => (
          <li key={item.id}>
            <h3>{item.name} - ${item.price}</h3>
          </li>
        ))}
      </ul>
      <h2>Total: ${total}</h2>
      <Payment total={total} delete_cart={delete_cart} />
    </div>
  );
};

export default Order;

