import styles from "./OrderHistory.module.css";
import { HandleHistory } from "../navigation/components/Navbar/Navbar";
import { useState } from "react";
import { useAuthenticatedUser } from "../configurator/hooks/useAuthenticatedUser";

type HandleHistoryProp = {
  handleHistory: HandleHistory;
};

function OrderHistoryModal({ handleHistory }: HandleHistoryProp) {
  const authenticatedUser = useAuthenticatedUser();
  const [showOrderDetails, setShowOrderDetails] = useState<boolean[]>(
    Array(authenticatedUser.orderHistory.length).fill(false)
  );

  const toggleOrderDetails = (index: number) => {
    const newShowOrderDetails = [...showOrderDetails];
    newShowOrderDetails[index] = !newShowOrderDetails[index];
    setShowOrderDetails(newShowOrderDetails);
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <button onClick={handleHistory} className={styles.closeButton}>
          Close
        </button>
        <div className={styles.orderHistory}>
          {authenticatedUser.orderHistory.map((order, index) => (
            <div key={index} className={styles.orderContainer}>
              <h3 onClick={() => toggleOrderDetails(index)} className={styles.orderId}>
                ID: {order.id}
              </h3>
              <div className={`${styles.orderDetails} ${showOrderDetails[index] ? styles.open : ""}`}>
                <p>Toppings:</p>
                <ul>
                  {order.toppings?.map((topping, toppingIndex) => (
                    <li key={toppingIndex}>
                      Topping: {topping.topping} {topping.emoji}, Price: {topping.price}
                    </li>
                  ))}
                </ul>
                <p>Size information:</p>
                <ul>
                  <li>Size: {order.size.size}</li>
                  <li>Price: {order.size.price}</li>
                </ul>
                <p>Discount: {order.discount * 100}%</p>
                <p>Quantity: {order.quantity}</p>
                <p>Total: {order.total.toFixed(2)}</p>
                <p>Shipping Information:</p>
                <ul>
                  <li>City: {order.shippingInformation.city}</li>
                  <li>County: {order.shippingInformation.county}</li>
                  <li>Postal Code: {order.shippingInformation.postalCode}</li>
                  <li>Street: {order.shippingInformation.street}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryModal;
