import React, { useState} from "react";
import { saveOrder } from "../services/orderService";
const Payment = ({ total, delete_cart, order, update_history}) => {
  const [window, setWindow] = useState(false);

  const pay = () => {
    {
      if (total > 0){
        openWindow()
        saveOrder(order, total)
        update_history()
      }
    }
  };

  const openWindow = () => {
    setWindow(true);
  };

  const closeWindow = () => {
    setWindow(false);
    delete_cart();
  };

  return (
    <div>
      <button
        className={`mt-4 px-4 py-2 rounded-lg text-white ${
          total > 0
            ? "bg-blue-500 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={pay}
        disabled={total === 0}
      >
        Pagar
      </button>

      {window ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
            <p className="text-center">
              <strong>Compra realizada con éxito</strong>
            </p>
            <p className="text-center">
              <strong>Total:</strong> ${total}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg mx-auto"
              onClick={closeWindow}
            >
              Cerrar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Payment;
