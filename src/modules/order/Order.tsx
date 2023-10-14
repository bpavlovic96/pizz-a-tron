import { useDispatch, useSelector } from "react-redux";
import { RootState, setCurrentConfiguration, OrderHistory } from "../storage/Slice";
import { useState, useEffect } from "react";
import DiscountButton from "../configurator/components/Discount/DiscountButton/DiscountButton";
import styles from "./Order.module.css";
import InputField from "./components/InputField/InputField";
import { ref, push } from "firebase/database";
import { db } from "../authentication/components/FirebaseInit/FirebaseInit";

function Order() {
  const currentConfiguration = useSelector((state: RootState) => state.storage.currentConfiguration);
  const authenticatedUser = useSelector((state: RootState) => state.storage.authenticatedUser);

  const dispatch = useDispatch();

  const [toppingsList, setToppingsList] = useState<string[]>([]);
  const [shippingInfo, setShippingInfo] = useState({
    street: "",
    city: "",
    postalCode: "",
    county: "",
  });

  useEffect(() => {
    const toppingsArray = currentConfiguration.toppings.map((topping) => topping.topping).join(", ");

    setToppingsList([toppingsArray]);
  }, [currentConfiguration.toppings]);

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const updateConfiguration = () => {
    const updatedConfiguration = {
      ...currentConfiguration,
      shippingInformation: {
        ...currentConfiguration.shippingInformation,
        ...shippingInfo,
      },
      finished: shippingInfo.street !== "" && shippingInfo.city !== "" && shippingInfo.postalCode !== "" ? true : false,
    };

    if (shippingInfo !== undefined) {
      dispatch(setCurrentConfiguration(updatedConfiguration));
    }

    return updatedConfiguration;
  };

  const prepareOrderForHistory = (updatedConfiguration: OrderHistory) => {
    const newOrder = {
      id: updatedConfiguration.id,
      toppings: updatedConfiguration.toppings,
      size: updatedConfiguration.size,
      discount: updatedConfiguration.discount,
      quantity: updatedConfiguration.quantity,
      total: updatedConfiguration.total,
      shippingInformation: updatedConfiguration.shippingInformation,
    };

    return newOrder;
  };

  const addOrderToHistory = () => {
    const updatedConfiguration = updateConfiguration();

    const updatedOrderHistory = prepareOrderForHistory(updatedConfiguration);

    if (authenticatedUser.userId) {
      const userOrderRef = ref(db, `users/${authenticatedUser.userId}/orders`);
      push(userOrderRef, updatedOrderHistory);
    }
  };

  return (
    <div className={styles.orderScreenWrapper}>
      <h2 className={styles.header}>Almost done!</h2>
      <div className={styles.orderFormWrapper}>
        <div className={styles.orderDetails}>
          <h3 className={styles.subHeader}>Order details</h3>
          <div className={styles.toppings}>
            <span className={styles.toppingsHeader}>TOPPINGS</span>
            <p className={styles.toppingsList}>{toppingsList}</p>
          </div>

          <p className={styles.quantity}>QTY: {currentConfiguration.quantity}</p>

          <span className={styles.deliveryNote}>
            Delivery <br />
            Free delivery within 1 hour or you don't have to pay.
          </span>

          <div className={styles.discountButtonContainer}>
            <DiscountButton />
          </div>
          <div className={styles.priceWrapper}>
            <span>Total price</span>
            <span className={styles.orderTotal}>${currentConfiguration.total.toFixed(2)}</span>
          </div>
        </div>
        <div className={styles.shippingInformation}>
          <h3 className={styles.subHeader}>Shipping information</h3>
          <div className={styles.inputFieldWrapper}>
            <InputField
              placeholder="Street name and number"
              value={shippingInfo.street}
              onChange={(e) => handleInputChange("street", e.target.value)}
            />
            <InputField
              placeholder="City"
              value={shippingInfo.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
            <InputField
              placeholder="Postal Code"
              value={shippingInfo.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
            />
            <InputField
              placeholder="County"
              value={shippingInfo.county}
              onChange={(e) => handleInputChange("county", e.target.value)}
            />
          </div>
          <div className={styles.paymentDetailsWrapper}>
            <h3 className={styles.subHeader}>Payment details</h3>
            <span>Cash on delivery</span>
          </div>
          <button className={styles.finishButton} onClick={addOrderToHistory}>
            Finish Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
