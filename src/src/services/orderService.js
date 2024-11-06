import {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const getOrders = async (isAdmin = false) => {
  const ordersRef = collection(db, "Orders");
  let ordersQuery;

  if (isAdmin) {
    // Si es admin, obtiene todas las órdenes
    ordersQuery = query(ordersRef, orderBy("date", "asc"));
  } else {
    // Si es cliente, obtiene solo sus órdenes (aquí se usa un filtro ficticio)
    ordersQuery = query(
      ordersRef,
      where("clientId", "==", "currentClientId"), // Aquí "currentClientId" debería ser el ID real del cliente en el futuro
      orderBy("date", "asc")
    );
  }

  const querySnapshot = await getDocs(ordersQuery);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


const saveOrder = async (orderItems, total) => {
  try {
    const orderData = {
      date: Timestamp.now(),
      items: orderItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      payment: "cash",
      total: total,
    };

    const docRef = await addDoc(collection(db, "Orders"), orderData);
    console.log("Pedido registrado con éxito:", docRef.id);
  } catch (error) {
    console.error("Error al registrar el pedido:", error);
  }
};
export {getOrders, saveOrder}