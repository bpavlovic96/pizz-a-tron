import { useDispatch, useSelector } from "react-redux";
import styles from "./Discount.module.css";
import { RootState, setCurrentConfiguration } from "../../../storage/Slice";
import { useState, ChangeEvent } from "react";

function Discount() {
  const dispatch = useDispatch();
  const initialConfiguration = useSelector(
    (state: RootState) => state.storage.initialConfiguration
  );
  const currentConfiguration = useSelector(
    (state: RootState) => state.storage.currentConfiguration
  );

  const [inputValue, setInputValue] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  const getInputDiscount = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDiscount = () => {
    const lowerCaseInput = inputValue.toLowerCase();

    for (const key in initialConfiguration.discount) {
      if (lowerCaseInput.includes(key.toLowerCase())) {
        dispatch(
          setCurrentConfiguration({
            ...currentConfiguration,
            discount: initialConfiguration.discount[key],
          })
        );
        setIsDiscountApplied(true);
        break;
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Get the discount</h2>
      <div className={styles.buttonWrapper}>
        <input
          type="text"
          placeholder="Enter discount code"
          className={
            isDiscountApplied
              ? `${styles.input} ${styles.appliedInput}`
              : styles.input
          }
          onChange={getInputDiscount}
          disabled={isDiscountApplied}
        />
        <button
          onClick={handleDiscount}
          disabled={isDiscountApplied}
          className={
            isDiscountApplied
              ? `${styles.button} ${styles.appliedButton}`
              : styles.button
          }
        >
          Apply
        </button>
      </div>
      <p className={styles.discountMessage}>
        {isDiscountApplied
          ? `Your discount of ${
              currentConfiguration.discount * 100
            }% has been applied!`
          : null}
      </p>
    </div>
  );
}

export default Discount;
