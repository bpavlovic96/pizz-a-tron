import styles from "./PizzaToppings.module.css";
import PizzaTopping from "../PizzaTopping/PizzaTopping";
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/Slice";
import { useState, useEffect } from "react";
import { Topping } from "../../../storage/Slice";

function PizzaToppings() {
  const hoveredTopping = useSelector(
    (state: RootState) => state.storage.hoveredTopping
  );

  const initialConfiguration = useSelector(
    (state: RootState) => state.storage.initialConfiguration
  );

  const [toppings, setToppings] = useState<Topping[]>([]);

  useEffect(() => {
    if (initialConfiguration.toppings && initialConfiguration) {
      setToppings(initialConfiguration.toppings);
    }
  }, [initialConfiguration, initialConfiguration.toppings]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Toppings! Toppings!</h2>
      {toppings.length > 0 && (
        <div className={styles.toppingsWrapper}>
          {toppings.map((topping) => (
            <PizzaTopping
              topping={topping.topping}
              emoji={topping.emoji}
              price={topping.price}
              id={topping.id}
            />
          ))}
        </div>
      )}

      <span
        className={styles.toppingPrice}
      >{`Total price +$${hoveredTopping.price}`}</span>
    </div>
  );
}

export default PizzaToppings;
