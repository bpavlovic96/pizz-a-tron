import styles from "./PizzaSize.module.css";
import { useSelector } from "react-redux";
import { RootState, setCurrentConfiguration } from "../../../storage/Slice";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

function PizzaSize() {
  const currentConfiguration = useSelector((state: RootState) => state.storage.currentConfiguration);

  const initialConfiguration = useSelector((state: RootState) => state.storage.initialConfiguration);

  const dispatch = useDispatch();

  const handlePizzaSize = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const value = (e.target as HTMLButtonElement).innerText;
      const updatedConfiguration = {
        ...currentConfiguration,
        size: { size: value, price: initialConfiguration.size[value] || 0 },
      };
      dispatch(setCurrentConfiguration(updatedConfiguration));
    },
    [currentConfiguration, dispatch, initialConfiguration.size]
  );

  return (
    <div className={styles.sizeWrapper}>
      <h2 className={styles.sizeHeader}>Pizza! Pizza! size</h2>
      <div className={styles.buttonWrapper}>
        {["S", "M", "L"].map((letter, index) => (
          <button
            onClick={handlePizzaSize}
            key={index}
            className={letter === currentConfiguration.size.size ? styles.button : ""}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PizzaSize;
