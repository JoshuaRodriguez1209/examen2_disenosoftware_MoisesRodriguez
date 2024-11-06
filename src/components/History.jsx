import React, { useState, useEffect } from "react";
import { getOrders } from "../services/orderService";

const History = ({ isAdmin,historyUpdate,clientId}) => {
  const [history, setHistory] = useState([]);
  const [queryHistory, setQueryHistory] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const actualHistory = await getOrders(isAdmin, clientId);
        setHistory(actualHistory);
        setQueryHistory(true);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setQueryHistory(true);
      }
    };

    fetchHistory();
  }, [isAdmin,historyUpdate,clientId]);

  useEffect(() => {
    if (clientId !== null) {
      console.log("clientId actualizado:", clientId);
    }
  }, [clientId]); // Este efecto se ejecutará cuando clientId cambie


  return (
    <div className="flex flex-col items-center justify-start p-4 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4">Historial de Órdenes</h2>
      {queryHistory ? (
        history.length > 0 ? (
          <div className="mt-6 w-full max-w-3xl overflow-y-auto max-h-[calc(100vh-150px)]">
            <ul className="space-y-6">
              {history.map((order, index) => (
                <li key={index} className="p-4 rounded-lg shadow-md bg-gray-50 border-l-4 border-b-4 border-blue-500">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-blue-700">
                      {isAdmin ?  `Orden : #${order.id}`
                      : `Orden #${index + 1}` 
                      }
                      
                    </h3>
                  </div>
                  <p className="text-md font-semibold mt-2 text-gray-700">
                    Total: <span className="text-green-600">${order.total}</span>
                  </p>
                  <p className="mt-2 text-gray-600 font-semibold">Items comprados:</p>
                  <ul className="mt-1 space-y-2 pl-4">
                    {order.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between text-gray-600"
                      >
                        <span>{item.name}</span>
                        <span>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-start mt-2">
                    <span className="text-sm text-gray-500">
                      Fecha: {order.date.toDate().toLocaleString("es-MX", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Pago: {order.payment}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h4 className="bg-gray-100 p-4 rounded-lg shadow-md mt-10 text-gray-600">
            {isAdmin ? "No existen órdenes anteriores" : "No tienes órdenes anteriores"}
          </h4>
        )
      ) : null}
    </div>
  );
};

export default History;
