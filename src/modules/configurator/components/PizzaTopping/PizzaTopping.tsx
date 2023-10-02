import styles from "./PizzaTopping.module.css";
import { useDispatch } from "react-redux";
import {
  setCurrentConfiguration,
  setHoveredTopping,
} from "../../../storage/Slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/Slice";

type Topping = {
  name: string;
  emoji: string;
  price: number;
  key: number;
};

const PizzaTopping = ({ name, emoji, price, key }: Topping) => {
  const currentConfiguration = useSelector(
    (state: RootState) => state.storage.currentConfiguration
  );

  const dispatch = useDispatch();

  const handleHover = (hoveredPrice: number, hoveredKey: number) => {
    dispatch(setHoveredTopping({ price: hoveredPrice, key: hoveredKey }));
  };

  const handleChooseTopping = () => {
    const newTopping = { name, price };

    dispatch(
      setCurrentConfiguration({
        ...currentConfiguration,
        toppings: [...currentConfiguration.toppings, newTopping],
      })
    );
  };

  return (
    <div className={styles.toppingsWrapper}>
      <div
        className={styles.topping}
        onMouseEnter={() => handleHover(price, key)}
        onClick={handleChooseTopping}
      >
        <div className={styles.emojiWrapper}>
          <p className={styles.toppingEmoji}>{emoji}</p>
        </div>
        <p className={styles.toppingName}>{name}</p>
      </div>
    </div>
  );
};

export default PizzaTopping;
