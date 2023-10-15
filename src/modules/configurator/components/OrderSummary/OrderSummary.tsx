import styles from "./OrderSummary.module.css";
import pizzaSlice from "../../../../assets/pizzaSlice.png";
import { useDispatch } from "react-redux";
import { useEffect, ChangeEvent, useState } from "react";
import { setCurrentConfiguration } from "../../../storage/Slice";
import { useCurrentConfiguration } from "../../hooks/useCurrentConfiguration";

function OrderSummary() {
  const currentConfiguration = useCurrentConfiguration();

  const dispatch = useDispatch();

  const [pizzaQuantity, setPizzaQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPizzaQuantity(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    dispatch(
      setCurrentConfiguration({
        quantity: !isNaN(pizzaQuantity) && pizzaQuantity >= 1 ? pizzaQuantity : 0,
      })
    );
  }, [currentConfiguration.quantity, pizzaQuantity, dispatch]);

  useEffect(() => {
    let toppingsPrice = 0;
    currentConfiguration.toppings.map((topping) => (toppingsPrice += topping.price));

    const totalPrice =
      (currentConfiguration.size.price + toppingsPrice) *
      currentConfiguration.quantity *
      (1 - currentConfiguration.discount);

    if (totalPrice !== currentConfiguration.total) {
      dispatch(
        setCurrentConfiguration({
          total: Number.isNaN(totalPrice) ? 0 : totalPrice,
        })
      );
    }
  }, [currentConfiguration, dispatch]);

  const handleConfigurationReady = () => {
    if (currentConfiguration.size.size === "" && isNaN(currentConfiguration.quantity)) {
      setErrorMessage(`Please select a Pizza size and quantity.`);
    } else if (currentConfiguration.size.size === "" && currentConfiguration.quantity <= 0) {
      setErrorMessage(`Please select a Pizza size.\nQuantity of pizzas cannot be 0, please select at least 1 pizza.`);
    } else if (currentConfiguration.size.size === "" && currentConfiguration.quantity > 10) {
      setErrorMessage(`Please select a Pizza size.\nMaximum quantity of 10 pizzas, please change the quantity.`);
    } else if (currentConfiguration.size.size === "") {
      setErrorMessage("Please select a size.");
    } else if (isNaN(currentConfiguration.quantity)) {
      setErrorMessage("Please select a quantity.");
    } else if (currentConfiguration.quantity <= 0) {
      setErrorMessage(`Quantity of pizzas cannot be 0, please select at least 1 pizza.`);
    } else if (currentConfiguration.quantity > 10) {
      setErrorMessage(`Maximum quantity of 10 pizzas, please change the quantity.`);
    } else {
      dispatch(
        setCurrentConfiguration({
          ready: true,
        })
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <img src={pizzaSlice} alt="Pizza slice" className={styles.pizzaImg} />
      <div className={styles.qtyAndTotalWrapper}>
        <div className={styles.qtyWrapper}>
          <input type="number" onChange={handleQuantityChange} value={pizzaQuantity} />
          <span>QTY</span>
        </div>

        <div className={styles.orderTotalWrapper}>
          <span className={styles.orderTotal}>
            {Number.isNaN(currentConfiguration.quantity) ? 0 : currentConfiguration.total.toFixed(2)}
          </span>
          <span className={styles.orderTotalText}>ORDER TOTAL</span>
        </div>
      </div>

      <button className={styles.button} onClick={handleConfigurationReady}>
        Buy Pizza! Pizza!
        <pre className={styles.quantityError}>{errorMessage}</pre>
      </button>
    </div>
  );
}

export default OrderSummary;
