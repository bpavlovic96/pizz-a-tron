import styles from "./PizzaSize.module.css";
import { setCurrentConfiguration } from "../../../storage/Slice";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useCurrentConfiguration } from "../../hooks/useCurrentConfiguration";
import { useInitialConfiguration } from "../../hooks/useInitialConfiguration";

function PizzaSize() {
  const currentConfiguration = useCurrentConfiguration();
  const initialConfiguration = useInitialConfiguration();

  const dispatch = useDispatch();

  const handlePizzaSize = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const value = (e.target as HTMLButtonElement).innerText;
      const updatedConfiguration = {
        size: { size: value, price: initialConfiguration.size[value] || 0 },
      };
      dispatch(setCurrentConfiguration(updatedConfiguration));
    },
    [dispatch, initialConfiguration.size]
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
