import { useSelector } from "react-redux";
import { RootState } from "../storage/Slice";
import { useState, useEffect } from "react";
import DiscountButton from "../configurator/components/Discount/DiscountButton/DiscountButton";
import styles from "./Order.module.css";
import InputField from "./components/InputField/InputField";

function Order() {
  const currentConfiguration = useSelector(
    (state: RootState) => state.storage.currentConfiguration
  );

  const [toppingsList, setToppingsList] = useState<string[]>([]);

  useEffect(() => {
    const toppingsArray = currentConfiguration.toppings
      .map((topping) => topping.topping)
      .join(", ");

    setToppingsList([toppingsArray]);
  }, [currentConfiguration.toppings]);

  console.log(currentConfiguration);

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

          <p className={styles.quantity}>
            QTY: {currentConfiguration.quantity}
          </p>

          <span className={styles.deliveryNote}>
            Delivery <br />
            Free delivery within 1 hour or you don't have to pay.
          </span>

          <div className={styles.discountButtonContainer}>
            <DiscountButton />
          </div>
          <div className={styles.priceWrapper}>
            <span>Total price</span>
            <span className={styles.orderTotal}>
              ${currentConfiguration.total.toFixed(2)}
            </span>
          </div>
        </div>
        <div className={styles.shippingInformation}>
          <h3 className={styles.subHeader}>Shipping information</h3>
          <div className={styles.inputFieldWrapper}>
            <InputField placeholder="Street name and number" />
            <InputField placeholder="City" />
            <InputField placeholder="Postal Code" />
            <InputField placeholder="County" />
          </div>
          <div className={styles.paymentDetailsWrapper}>
            <h3 className={styles.subHeader}>Payment details</h3>
            <span>Cash on delivery</span>
          </div>
          <button className={styles.finishButton}>Finish Order</button>
        </div>
      </div>
    </div>
  );
}

export default Order;
