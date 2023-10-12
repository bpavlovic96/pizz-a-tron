import styles from "./OrderSummary.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../storage/Slice";
import { useState, useEffect, ChangeEvent } from "react";
import { setCurrentConfiguration } from "../../../storage/Slice";

function OrderSummary() {
  const currentConfiguration = useSelector(
    (state: RootState) => state.storage.currentConfiguration
  );

  const dispatch = useDispatch();

  const [currentConfigurationQuantity, setCurrentConfigurationQuantity] =
    useState(1);
  const [currentConfigurationTotal, setCurrentConfigurationTotal] = useState(0);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value, 10);
    setCurrentConfigurationQuantity(parsedValue);

    dispatch(
      setCurrentConfiguration({
        ...currentConfiguration,
        quantity: Number.isNaN(parsedValue) ? 1 : parsedValue,
      })
    );
  };

  useEffect(() => {
    let toppingsPrice = 0;
    currentConfiguration.toppings.map(
      (topping) => (toppingsPrice += topping.price)
    );
    setCurrentConfigurationTotal(
      (currentConfiguration.size.price + toppingsPrice) *
        currentConfigurationQuantity *
        (1 - currentConfiguration.discount)
    );
  }, [
    currentConfiguration,
    currentConfigurationQuantity,
    currentConfigurationTotal,
  ]);

  useEffect(() => {
    dispatch(
      setCurrentConfiguration({
        ...currentConfiguration,
        total: Number.isNaN(currentConfigurationTotal)
          ? 1
          : currentConfigurationTotal,
      })
    );
  }, [currentConfigurationTotal]);

  const handleConfigurationReady = () => {
    currentConfiguration.size.size !== "" &&
      dispatch(
        setCurrentConfiguration({
          ...currentConfiguration,
          ready: true,
        })
      );
  };

  console.log(currentConfigurationQuantity);

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
              : currentConfigurationTotal.toFixed(2)}
          </span>
          <span className={styles.orderTotalText}>ORDER TOTAL</span>
        </div>
      </div>
      <button className={styles.button} onClick={handleConfigurationReady}>
        Buy Pizza! Pizza!
      </button>
    </div>
  );
}

export default OrderSummary;
