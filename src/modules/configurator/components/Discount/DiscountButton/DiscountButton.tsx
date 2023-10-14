import { useDispatch, useSelector } from "react-redux";
import styles from "./DiscountButton.module.css";
import { RootState, setCurrentConfiguration, setDiscountDetails } from "../../../../storage/Slice";
import { useState, ChangeEvent, useEffect } from "react";

function DiscountButton() {
  const dispatch = useDispatch();
  const initialConfiguration = useSelector((state: RootState) => state.storage.initialConfiguration);
  const currentConfiguration = useSelector((state: RootState) => state.storage.currentConfiguration);

  const discountDetails = useSelector((state: RootState) => state.storage.discountDetails);

  const [inputValue, setInputValue] = useState("");

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
        dispatch(
          setDiscountDetails({
            isDiscountApplied: true,
            discountWord: inputValue,
          })
        );
        break;
      }
    }
  };

  useEffect(() => {
    if (discountDetails.isDiscountApplied) {
      const updatedConfiguration = {
        ...currentConfiguration,
        total: currentConfiguration.total * (1 - currentConfiguration.discount),
      };

      dispatch(setCurrentConfiguration(updatedConfiguration));
    }
  }, [currentConfiguration.discount, discountDetails.isDiscountApplied, dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonWrapper}>
        <input
          type="text"
          placeholder="Enter discount code"
          className={discountDetails.isDiscountApplied ? `${styles.input} ${styles.appliedInput}` : styles.input}
          value={discountDetails.isDiscountApplied ? discountDetails.discountWord : inputValue}
          onChange={getInputDiscount}
          disabled={discountDetails.isDiscountApplied}
        />
        <button
          onClick={handleDiscount}
          disabled={discountDetails.isDiscountApplied}
          className={discountDetails.isDiscountApplied ? `${styles.button} ${styles.appliedButton}` : styles.button}
        >
          Apply
        </button>
      </div>
      <p className={styles.discountMessage}>
        {discountDetails.isDiscountApplied
          ? `Your discount of ${currentConfiguration.discount * 100}% has been applied!`
          : null}
      </p>
    </div>
  );
}

export default DiscountButton;
