import React from 'react'

const Payment = ({total,delete_cart}) => {
  const pay = () => {
    alert(`Orden pagada total:  ${total}`);
    delete_cart();
  }
  return (
    <div>
      <button onClick={pay}>Pagar</button>
      
    </div>
  )
}

export default Payment
