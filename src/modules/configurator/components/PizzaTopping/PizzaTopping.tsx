import styles from "./PizzaTopping.module.css";
import { useDispatch } from "react-redux";
import {
  setCurrentConfiguration,
  setHoveredTopping,
} from "../../../storage/Slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/Slice";
import { Topping } from "../../../storage/Slice";

const PizzaTopping = ({ topping, emoji, price, id }: Topping) => {
  const currentConfiguration = useSelector(
    (state: RootState) => state.storage.currentConfiguration
  );

  const dispatch = useDispatch();

  const handleHover = (hoveredPrice: number, hoveredKey: number) => {
    dispatch(setHoveredTopping({ price: hoveredPrice, id: hoveredKey }));
  };

  const handleChooseTopping = () => {
    const newTopping = { topping, price, emoji, id };

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
        onMouseEnter={() => handleHover(price, id)}
        onClick={handleChooseTopping}
      >
        <div className={styles.emojiWrapper}>
          <p className={styles.toppingEmoji}>{emoji}</p>
        </div>
        <p className={styles.toppingName}>{topping}</p>
      </div>
    </div>
  );
};

export default PizzaTopping;
