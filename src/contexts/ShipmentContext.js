import { useEffect, useState, createContext, useContext } from 'react';
import { firestore } from '../firebase';
import { collection, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';

const ShipmentContext = createContext();

export function useShipments() {
  return useContext(ShipmentContext);
}

export function ShipmentProvider({ children }) {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const shipmentCollection = collection(firestore, 'shipments');
    const unsubscribe = onSnapshot(shipmentCollection, (snapshot) => {
      const shipmentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Fetched Shipments:", shipmentsData);
      setShipments(shipmentsData);
    });
    return unsubscribe;
  }, []);

  const getShipmentById = (id) => {
    return shipments.find((shipment) => shipment.id === id);
  };

  const createShipmentFromOrder = async (order) => {
    const shipmentCollection = collection(firestore, 'shipments');
    await addDoc(shipmentCollection, {
      orderId: order.id,
      status: 'Pending',
      createdAt: new Date(),
      estimatedDelivery: "Not Available", // Default placeholder
    });
  };

  const updateShipmentStatus = async (shipmentId, status, estimatedDelivery = null) => {
    const shipmentDoc = doc(firestore, 'shipments', shipmentId);
    const updatedFields = { status };
    if (estimatedDelivery) {
      updatedFields.estimatedDelivery = estimatedDelivery;
    }
    await updateDoc(shipmentDoc, updatedFields);
  };

  return (
    <ShipmentContext.Provider value={{ shipments, createShipmentFromOrder, updateShipmentStatus, getShipmentById }}>
      {children}
    </ShipmentContext.Provider>
  );
}
