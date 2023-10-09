import styles from "./OrderSummary.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/Slice";
import { useState, useEffect, ChangeEvent } from "react";

function OrderSummary() {
  const currentConfiguration = useSelector(
    (state: RootState) => state.storage.currentConfiguration
  );

  const [currentConfigurationQuantity, setcurrentConfigurationQuantity] =
    useState(1);
  const [currentConfigurationTotal, setCurrentConfigurationTotal] = useState(0);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    currentConfigurationQuantity <= 0 &&
    Number.isNaN(currentConfigurationQuantity)
      ? setcurrentConfigurationQuantity(1)
      : setcurrentConfigurationQuantity(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    let toppingsPrice = 0;
    currentConfiguration.toppings.map(
      (topping) => (toppingsPrice += topping.price)
    );
    setCurrentConfigurationTotal(
      (currentConfiguration.size.price + toppingsPrice) *
        currentConfigurationQuantity
    );
  }, [
    currentConfiguration.size.price,
    currentConfiguration.toppings,
    currentConfigurationQuantity,
  ]);

  return (
    <div className={styles.wrapper}>
      <img
        src="src\assets\pizzaSlice.png"
        alt="Pizza slice"
        className={styles.pizzaImg}
      />
      <div className={styles.qtyAndTotalWrapper}>
        <div className={styles.qtyWrapper}>
          <input
            type="number"
            value={currentConfigurationQuantity}
            onChange={handleQuantityChange}
          />
          <span>QTY</span>
        </div>
        <div className={styles.orderTotalWrapper}>
          <span className={styles.orderTotal}>
            {Number.isNaN(currentConfigurationQuantity)
              ? 0
              : currentConfigurationTotal}
          </span>
          <span className={styles.orderTotalText}>ORDER TOTAL</span>
        </div>
      </div>
      <button className={styles.button}>Buy Pizza! Pizza!</button>
    </div>
  );
}

export default OrderSummary;
