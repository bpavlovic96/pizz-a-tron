import styles from "./PizzaTopping.module.css";
import { useDispatch } from "react-redux";
import { setCurrentConfiguration, setHoveredTopping } from "../../../storage/Slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/Slice";
import { Topping } from "../../../storage/Slice";

type ToppingExtended = Topping & {
  key: number;
};

const PizzaTopping = ({ topping, emoji, price, id }: ToppingExtended) => {
  const currentConfiguration = useSelector((state: RootState) => state.storage.currentConfiguration);

  const dispatch = useDispatch();

  const handleHover = (hoveredPrice: number, hoveredKey: number) => {
    dispatch(setHoveredTopping({ price: hoveredPrice, id: hoveredKey }));
  };

  const handleHoverLeave = () => {
    dispatch(setHoveredTopping({ price: 0, id: null }));
  };

  const handleChooseTopping = () => {
    const isToppingSelected = currentConfiguration.toppings.some((topping) => topping.id === id);

    if (isToppingSelected === false) {
      const newTopping = { topping, price, emoji, id };

      dispatch(
        setCurrentConfiguration({
          ...currentConfiguration,
          toppings: [...currentConfiguration.toppings, newTopping],
        })
      );
    } else {
      const updatedToppings = currentConfiguration.toppings.filter((topping) => topping.id !== id);

      dispatch(
        setCurrentConfiguration({
          ...currentConfiguration,
          toppings: updatedToppings,
        })
      );
    }
  };

  const isSelected = currentConfiguration.toppings.some((selectedTopping) => selectedTopping.id === id);

  return (
    <div className={`${styles.toppingsWrapper} ${isSelected ? styles.selectedTopping : null}`}>
      <div
        className={styles.topping}
        onMouseEnter={() => handleHover(price, id)}
        onMouseLeave={handleHoverLeave}
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
