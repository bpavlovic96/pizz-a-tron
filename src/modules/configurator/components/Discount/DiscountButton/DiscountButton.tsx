import { useDispatch } from "react-redux";
import styles from "./DiscountButton.module.css";
import { setCurrentConfiguration, setDiscountDetails } from "../../../../storage/Slice";
import { useState, ChangeEvent } from "react";
import { useCurrentConfiguration } from "../../../hooks/useCurrentConfiguration";
import { useInitialConfiguration } from "../../../hooks/useInitialConfiguration";
import { useDiscountDetails } from "../../../hooks/useDiscountDetails";

function DiscountButton() {
  const dispatch = useDispatch();
  const initialConfiguration = useInitialConfiguration();
  const currentConfiguration = useCurrentConfiguration();

  const discountDetails = useDiscountDetails();

  const [inputValue, setInputValue] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");

  const getInputDiscount = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDiscount = () => {
    const lowerCaseInput = inputValue.toLowerCase();

    for (const key in initialConfiguration.discount) {
      if (lowerCaseInput.includes(key.toLowerCase())) {
        dispatch(
          setCurrentConfiguration({
            discount: initialConfiguration.discount[key],
          })
        );
        if (!discountDetails.isDiscountApplied) {
          dispatch(
            setDiscountDetails({
              isDiscountApplied: true,
              discountWord: inputValue,
            })
          );
          setDiscountMessage("");
        }
        break;
      } else {
        setDiscountMessage("Your discount code is invalid.");
      }
    }
  };

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
      {discountDetails.isDiscountApplied && (
        <p className={styles.discountMessage}>
          Your discount of ${currentConfiguration.discount * 100}% has been applied!
        </p>
      )}
      {discountMessage && <p className={styles.discountWrongMessage}>{discountMessage}</p>}
    </div>
  );
}

export default DiscountButton;
