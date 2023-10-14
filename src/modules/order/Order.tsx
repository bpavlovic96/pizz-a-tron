import { useDispatch, useSelector } from "react-redux";
import { RootState, setCurrentConfiguration } from "../storage/Slice";
import { useState, useEffect } from "react";
import DiscountButton from "../configurator/components/Discount/DiscountButton/DiscountButton";
import styles from "./Order.module.css";
import InputField from "./components/InputField/InputField";

function Order() {
  const currentConfiguration = useSelector((state: RootState) => state.storage.currentConfiguration);

  const dispatch = useDispatch();

  const [toppingsList, setToppingsList] = useState<string[]>([]);
  const [shippingInformation, setShippingInformation] = useState({
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
    setShippingInformation((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handleShippingInformation = () => {
    dispatch(
      setCurrentConfiguration({
        ...currentConfiguration,
        shippingInformation: { ...shippingInformation },
        finished: true,
      })
    );
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
              value={shippingInformation.street}
              onChange={(e) => handleInputChange("street", e.target.value)}
            />
            <InputField
              placeholder="City"
              value={shippingInformation.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
            <InputField
              placeholder="Postal Code"
              value={shippingInformation.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
            />
            <InputField
              placeholder="County"
              value={shippingInformation.county}
              onChange={(e) => handleInputChange("county", e.target.value)}
            />
          </div>
          <div className={styles.paymentDetailsWrapper}>
            <h3 className={styles.subHeader}>Payment details</h3>
            <span>Cash on delivery</span>
          </div>
          <button className={styles.finishButton} onClick={handleShippingInformation}>
            Finish Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
