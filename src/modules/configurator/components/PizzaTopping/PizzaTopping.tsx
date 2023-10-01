import styles from "./PizzaTopping.module.css";
import { useDispatch } from "react-redux";
import { setHoveredTopping } from "../../../storage/Slice";

type Topping = {
  name: string;
  emoji: string;
  price: number;
  key: number;
};

const PizzaTopping = ({ name, emoji, price, key }: Topping) => {
  const dispatch = useDispatch();

  const handleHover = (hoveredPrice: number, hoveredKey: number) => {
    dispatch(setHoveredTopping({ price: hoveredPrice, key: hoveredKey }));
  };

  return (
    <div className={styles.toppingsWrapper}>
      <div
        className={styles.topping}
        onMouseEnter={() => handleHover(price, key)}
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
