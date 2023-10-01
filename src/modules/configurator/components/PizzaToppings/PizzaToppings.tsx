import styles from "./PizzaToppings.module.css";
import PizzaTopping from "../PizzaTopping/PizzaTopping";
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/Slice";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../../authentication/components/FirebaseInit/FirebaseInit";

type Toppings = {
  topping: string;
  emoji: string;
  price: number;
};

function PizzaToppings() {
  const hoveredTopping = useSelector(
    (state: RootState) => state.storage.hoveredTopping
  );

  const [toppings, setToppings] = useState<Toppings[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const off = onValue(ref(db), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const toppingsData = Object.values(data)[0] as Toppings[];
          setToppings(toppingsData);
        }
      });

      return () => {
        off();
      };
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Toppings! Toppings!</h2>
      <div className={styles.toppingsWrapper}>
        {toppings.map((topping, index) => (
          <PizzaTopping
            name={topping.topping}
            emoji={topping.emoji}
            price={topping.price}
            key={index}
          />
        ))}
      </div>

      <span
        className={styles.toppingPrice}
      >{`Total price +$${hoveredTopping.price}`}</span>
    </div>
  );
}

export default PizzaToppings;
