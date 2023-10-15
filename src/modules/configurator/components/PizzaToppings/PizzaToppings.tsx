import styles from "./PizzaToppings.module.css";
import PizzaTopping from "../PizzaTopping/PizzaTopping";

import { useState, useEffect } from "react";
import { Topping } from "../../../storage/Slice";
import { useHoveredTopping } from "../../hooks/useHoveredTopping";
import { useInitialConfiguration } from "../../hooks/useInitialConfiguration";

function PizzaToppings() {
  const hoveredTopping = useHoveredTopping();

  const initialConfiguration = useInitialConfiguration();

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
          {toppings.map((topping, index) => (
            <PizzaTopping
              topping={topping.topping}
              emoji={topping.emoji}
              price={topping.price}
              id={topping.id}
              key={index}
            />
          ))}
        </div>
      )}

      <div
        className={
          hoveredTopping.price === 0
            ? `${styles.toppingPriceContainer} ${styles.toppingPriceContainerEmpty}`
            : styles.toppingPriceContainer
        }
      >
        <span>Topping price: </span>
        <span className={styles.toppingPrice}>{hoveredTopping.price !== 0 ? `$${hoveredTopping.price}` : "$0"}</span>
      </div>
    </div>
  );
}

export default PizzaToppings;
